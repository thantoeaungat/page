import instagramImage from '../images/instagram-min.png';
import facebookImage from '../images/facebook-min.png';
import githubImage from '../images/github-min.png';
import linkedinImage from '../images/linkedin-min.png';
import twitterImage from '../images/twitter-min.png';

function constructSocialContact(socialContact) {
    const socialAnchor = document.createElement('a');
    socialAnchor.href = socialContact.profile;
    socialAnchor.target = '_blank';
    socialAnchor.id = `social-contact-${socialContact.id}`;

    const socialImage = document.createElement('img');
    socialImage.src = socialContact.brandImage;
    socialImage.alt = socialContact.altText;

    socialAnchor.appendChild(socialImage);

    return socialAnchor;
}

function constructGithubContact(username) {
    return {
        id: 'github',
        brandImage: githubImage,
        profile: `https://github.com/${username}`,
        altText: 'GitHub Profile'
    };
}

function constructLinkedinContact(username) {
    return {
        id: 'linkedin',
        brandImage: linkedinImage,
        profile: `https://www.linkedin.com/in/${username}`,
        altText: 'LinkedIn Profile'
    };
}

function constructTwitterContact(username) {
    return {
        id: 'twitter',
        brandImage: twitterImage,
        profile: `https://twitter.com/${username}`,
        altText: 'Twitter Profile'
    };
}

function constructFacebookContact(username) {
    return {
        id: 'facebook',
        brandImage: facebookImage,
        profile: `https://www.facebook.com/${username}`,
        altText: 'Facebook Profile'
    };
}

function constructInstagramContact(username) {
    return {
        id: 'instagram',
        brandImage: instagramImage,
        profile: `https://www.instagram.com/${username}`,
        altText: 'Instagram Profile'
    };
}

export default class SocialContact extends HTMLElement {
    static template = `
        <style>
            .social-contact-container {
            display: flex;
            justify-content: center;
            padding: 16px;
            }
            .social-contact-container a {
                margin-right: 16px;
            }
            .social-contact-container a:last-of-type {
                margin-right: 0;
            }
            .social-contact-container img {
                height: 32px;
            }
        </style>
        <div class="social-contact-container"></div>
    `;
    /**
     * @type {HTMLTemplateElement}
     */
    static templateElem = null;

    constructor() {
        super();

        if (!SocialContact.templateElem) {
            SocialContact.templateElem = document.createElement('template');
            SocialContact.templateElem.innerHTML = SocialContact.template;
        }
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({
            mode: 'open'
        });
        const socialContactTemplateClone = SocialContact.templateElem.content.cloneNode(true);
        const socialContactContainer = socialContactTemplateClone.querySelector('.social-contact-container');

        const github = this.getAttribute('github') || '';
        const linkedin = this.getAttribute('linkedin') || '';
        const twitter = this.getAttribute('twitter') || '';
        const facebook = this.getAttribute('facebook') || '';
        const instagram = this.getAttribute('instagram') || '';

        const socialContacts = [];

        if (github) {
            socialContacts.push(constructGithubContact(github));
        }
        if (linkedin) {
            socialContacts.push(constructLinkedinContact(linkedin));
        }
        if (twitter) {
            socialContacts.push(constructTwitterContact(twitter));
        }
        if (facebook) {
            socialContacts.push(constructFacebookContact(facebook));
        }
        if (instagram) {
            socialContacts.push(constructInstagramContact(instagram));
        }

        if (socialContacts.length) {
            socialContacts
                .forEach(socialContact => {
                    const socialContactElem = constructSocialContact(socialContact);
                    socialContactContainer.appendChild(socialContactElem);
                });
        } else {
            const socialContactText = document.createTextNode('No social profile information provided');
            socialContactContainer.appendChild(socialContactText);
        }

        shadowRoot.appendChild(socialContactTemplateClone);
    }
}

/*
  Register or associate the web component
  with a <social-contact></social-contact> element
*/
(function () {
    const customElementName = 'social-contact';
    if (customElements.get(customElementName)) {
        console.error(`There is already a custom element registered under the name ${customElementName}`);
    } else {
        customElements.define(customElementName, SocialContact);
    }
}());