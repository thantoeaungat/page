import { defineStore } from 'pinia';
import axios from 'axios';
import { useLocalStorage } from '@vueuse/core';
import { useHostStore } from './hosts.js';
import { useLogViewerStore } from './logViewer.js';

export const useFileStore = defineStore({
  id: 'files',

  state: () => ({
    // data
    folders: [],
    direction: useLocalStorage('fileViewerDirection', 'desc'),
    selectedFileIdentifier: null,

    error: null,
    clearingCache: {},
    cacheRecentlyCleared: {},
    deleting: {},
    abortController: null,

    // control variables
    loading: false,
    checkBoxesVisibility: false,
    filesChecked: [],
    openFolderIdentifiers: [],
    foldersInView: [],
    containerTop: 0,
    sidebarOpen: false,
  }),

  getters: {
    selectedHost() {
      const hostStore = useHostStore();
      return hostStore.selectedHost;
    },

    hostQueryParam() {
      const hostStore = useHostStore();
      return hostStore.hostQueryParam;
    },

    files: (state) => state.folders.flatMap((folder) => folder.files),

    selectedFile: (state) => state.files.find((file) => file.identifier === state.selectedFileIdentifier),

    foldersOpen(state) {
      return state.openFolderIdentifiers.map((identifier) => state.folders.find((folder) => folder.identifier === identifier));
    },

    isOpen() {
      return (folder) => this.foldersOpen.includes(folder);
    },

    isChecked: (state) => (file) => state.filesChecked.includes(
      typeof file === 'string' ? file : file.identifier
    ),

    shouldBeSticky(state) {
      return (folder) => this.isOpen(folder) && state.foldersInView.includes(folder);
    },

    isInViewport() {
      return (index) => this.pixelsAboveFold(index) > -36
    },

    pixelsAboveFold: (state) => (folder) => {
      let folderContainer = document.getElementById('folder-' + folder);
      if (!folderContainer) return false;
      let row = folderContainer.getClientRects()[0];
      return (row.top + row.height) - state.containerTop;
    },

    hasFilesChecked: (state) => state.filesChecked.length > 0,
  },

  actions: {
    setDirection(direction) {
      this.direction = direction;
    },

    selectFile(logFileIdentifier) {
      if (this.selectedFileIdentifier === logFileIdentifier) return;

      this.selectedFileIdentifier = logFileIdentifier;
      this.openFolderForActiveFile();
    },

    openFolderForActiveFile() {
      if (this.selectedFile) {
        const folder = this.folders.find(folder => folder.files.some(file => file.identifier === this.selectedFile.identifier));

        if (folder && !this.isOpen(folder)) {
          this.toggle(folder);
        }
      }
    },

    openRootFolderIfNoneOpen() {
      const rootFolder = this.folders.find(folder => folder.is_root);

      if (rootFolder && this.openFolderIdentifiers.length === 0) {
        this.openFolderIdentifiers.push(rootFolder.identifier);
      }
    },

    loadFolders() {
      // abort the previous request which might now be outdated
      if (this.abortController) {
        this.abortController.abort();
      }

      if (!this.selectedHost) {
        this.folders = [];
        this.error = null;
        this.loading = false;
        return;
      }

      this.abortController = new AbortController();
      this.loading = true;

      // load the folders from the server
      return axios.get(`${LogViewer.basePath}/api/folders`, {
          params: {
            host: this.hostQueryParam,
            direction: this.direction,
          },
          signal: this.abortController.signal
        })
        .then(({ data }) => {
          this.folders = data;
          this.error = data.error || null;
          this.loading = false;

          if (this.openFolderIdentifiers.length === 0) {
            this.openFolderForActiveFile();
            this.openRootFolderIfNoneOpen();
          }

          this.onScroll();
        })
        .catch((error) => {
          // aborted, thus we don't need to display that as an error.
          if (error.code === 'ERR_CANCELED') return;

          this.loading = false;
          this.error = error.message;

          if (error.response?.data?.message) {
            this.error += ': ' + error.response.data.message;
          }

          console.error(error);
        })
    },

    toggle(folder) {
      if (this.isOpen(folder)) {
        this.openFolderIdentifiers = this.openFolderIdentifiers.filter(f => f !== folder.identifier);
      } else {
        this.openFolderIdentifiers.push(folder.identifier);
      }
      this.onScroll();
    },

    onScroll() {
      let vm = this;
      this.foldersOpen.forEach(function (folder) {
        if (vm.isInViewport(folder)) {
          if (!vm.foldersInView.includes(folder)) {
            vm.foldersInView.push(folder);
          }
        } else {
          vm.foldersInView = vm.foldersInView.filter(f => f !== folder);
        }
      })
    },

    reset() {
      this.openFolderIdentifiers = [];
      this.foldersInView = [];
      const container = document.getElementById('file-list-container');
      if (container) {
        this.containerTop = container.getBoundingClientRect().top;
        container.scrollTo(0, 0);
      }
    },

    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },

    checkBoxToggle(file) {
      if (this.isChecked(file)) {
        this.filesChecked = this.filesChecked.filter(f => f !== file);
      } else {
        this.filesChecked.push(file);
      }
    },

    toggleCheckboxVisibility() {
      this.checkBoxesVisibility = !this.checkBoxesVisibility;
    },

    resetChecks() {
      this.filesChecked = [];
      this.checkBoxesVisibility = false;
    },

    clearCacheForFile(file) {
      this.clearingCache[file.identifier] = true;

      return axios.post(`${LogViewer.basePath}/api/files/${file.identifier}/clear-cache`, {}, {
          params: { host: this.hostQueryParam }
        })
        .then(() => {
          if (file.identifier === this.selectedFileIdentifier) {
            useLogViewerStore().loadLogs();
          }

          this.cacheRecentlyCleared[file.identifier] = true;
          setTimeout(() => this.cacheRecentlyCleared[file.identifier] = false, 2000);
        })
        .catch((error) => console.error(error))
        .finally(() => this.clearingCache[file.identifier] = false);
    },

    deleteFile(file) {
      return axios.delete(`${LogViewer.basePath}/api/files/${file.identifier}`, {
          params: { host: this.hostQueryParam }
        })
        .then(() => this.loadFolders())
    },

    clearCacheForFolder(folder) {
      this.clearingCache[folder.identifier] = true;

      return axios.post(`${LogViewer.basePath}/api/folders/${folder.identifier}/clear-cache`, {}, {
          params: { host: this.hostQueryParam }
        })
        .then(() => {
          if (folder.files.some(file => file.identifier === this.selectedFileIdentifier)) {
            useLogViewerStore().loadLogs();
          }

          this.cacheRecentlyCleared[folder.identifier] = true;
          setTimeout(() => this.cacheRecentlyCleared[folder.identifier] = false, 2000);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          this.clearingCache[folder.identifier] = false;
        })
    },

    deleteFolder(folder) {
      this.deleting[folder.identifier] = true;

      return axios.delete(`${LogViewer.basePath}/api/folders/${folder.identifier}`, {
          params: { host: this.hostQueryParam }
        })
        .then(() => this.loadFolders())
        .catch((error) => console.error(error))
        .finally(() => {
          this.deleting[folder.identifier] = false;
        })
    },

    deleteSelectedFiles() {
      return axios.post(`${LogViewer.basePath}/api/delete-multiple-files`, {
        files: this.filesChecked
      }, {
        params: { host: this.hostQueryParam }
      });
    },

    clearCacheForAllFiles() {
      this.clearingCache['*'] = true;

      axios.post(`${LogViewer.basePath}/api/clear-cache-all`, {}, {
          params: { host: this.hostQueryParam }
        })
        .then(() => {
          this.cacheRecentlyCleared['*'] = true;
          setTimeout(() => this.cacheRecentlyCleared['*'] = false, 2000);
          useLogViewerStore().loadLogs();
        })
        .catch((error) => console.error(error))
        .finally(() => this.clearingCache['*'] = false);
    },
  },
})
