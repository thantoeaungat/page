# Social Contact Web Component
A web component that displays your contact information across the most popular social networks.

| Social Network | Social Contact attribute |
|----------------|--------------------------|
| Twitter        | twitter                  |
| LinkedIn       | linkedin                 |
| Facebook       | facebook                 |
| Instagram      | instagram                |
| GitHub         | github                   |

The component itself renders like below:  
![Social Contact Rendered Screenshot](./images/social-contact-screenshot.png)

Each one of the social profile links will open in a new tab when clicked.

[Try it out yourself! (codepen)](https://codepen.io/rcasto/full/zYvdJqV)

## Usage

### Via script tag
```html
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Social Contact - Web Component</title>
    <style>
        social-contact {
            display: block;
            width: 320px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <social-contact
        github="rcasto"
        linkedin="rcasto">
    </social-contact>

    <script async src="https://cdn.jsdelivr.net/npm/social-contact@1.0.5/dist/socialcontact.min.js"></script>
</body>
</html>
```

### Via module bundler
1. Install package via package manager of your choice.
```
npm install social-contact
```

2. `import 'social-contact'` as part of your app module, it should then be included as part of your bundle.
```javascript
import 'social-contact';

// Rest of your code...
```

3. You can now use `<social-contact></social-contact>` in your app views!

If any of these properties is omitted, then that social contact method is simply not rendered.

For each of the social contact methods, all you need to provide to the web component property is the username associated with the social network profile.

## References
- https://brand.linkedin.com/downloads
- https://en.facebookbrand.com/facebookapp/
- https://github.com/logos
- https://about.twitter.com/en_us/company/brand-resources.html
- https://en.instagram-brand.com/assets/icons