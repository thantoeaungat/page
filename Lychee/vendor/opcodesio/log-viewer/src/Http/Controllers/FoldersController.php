<?php

namespace Opcodes\LogViewer\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use Opcodes\LogViewer\Facades\LogViewer;
use Opcodes\LogViewer\Http\Resources\LogFolderResource;
use Opcodes\LogViewer\LogFile;

class FoldersController
{
    public function index(Request $request)
    {
        JsonResource::withoutWrapping();

        $folders = LogViewer::getFilesGroupedByFolder();

        if ($request->query('direction', 'desc') === 'asc') {
            $folders = $folders->sortByEarliestFirstIncludingFiles();
        } else {
            $folders = $folders->sortByLatestFirstIncludingFiles();
        }

        return LogFolderResource::collection($folders->values());
    }

    public function download(string $folderIdentifier)
    {
        $folder = LogViewer::getFolder($folderIdentifier);

        abort_if(is_null($folder), 404);

        Gate::authorize('downloadLogFolder', $folder);

        return $folder->download();
    }

    public function clearCache(string $folderIdentifier)
    {
        $folder = LogViewer::getFolder($folderIdentifier);

        abort_if(is_null($folder), 404);

        $folder?->files()->each->clearCache();

        return response()->json(['success' => true]);
    }

    public function delete(string $folderIdentifier)
    {
        $folder = LogViewer::getFolder($folderIdentifier);

        if (is_null($folder)) {
            return response()->json(['success' => true]);
        }

        Gate::authorize('deleteLogFolder', $folder);

        $folder->files()->each(function (LogFile $file) {
            if (Gate::check('deleteLogFile', $file)) {
                $file->delete();
            }
        });

        return response()->json(['success' => true]);
    }
}
