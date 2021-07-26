# @sebbo2002/semantic-release-docker

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

Small plugin for semantic-release that tags a previously built Docker image and pushes it to one or more Docker
registries. It is assumed that the login has already happened before.


## 📦 Installation

	npm i --D @sebbo2002/semantic-release-docker


## 🔧 Configuration Example

```js
[
    ['@sebbo2002/semantic-release-docker', {
        images: [
            'ghcr.io/sebbo2002/ble2mqtt@sha256:20d67c38e5d1e215413efdca800069998e325669c91a84cba37033866baecc98',
            'sebbo2002/ble2mqtt:49055cc3e7292e11e9aa081418e3e5570c1f163a'
        ],
        tag: {
            latest: true,
            major: true,
            minor: true,
            version: true,
            channel: true
        }
    }]
]
```

<table>
    <tr>
        <th scope="row">images</td>
        <td>A single image or mutliple images as array. Used as source images to tag.</td>
    </tr>
    <tr>
        <th scope="row">tag.latest</td>
        <td>Set to true to create latest tag (except it's a pre-release)</td>
    </tr>
    <tr>
        <th scope="row">tag.major</td>
        <td>Set to true to create a major tag (except it's a pre-release, v4.2.9 → image:4)</td>
    </tr>
    <tr>
        <th scope="row">tag.minor</td>
        <td>Set to true to create a minor tag (except it's a pre-release, v4.2.9 → image:4.2)</td>
    </tr>
    <tr>
        <th scope="row">tag.version</td>
        <td>Set to true to create a minor tag (v4.2.9-develop.1 → image:4.2.9-develop.1)</td>
    </tr>
    <tr>
        <th scope="row">tag.channel</td>
        <td>Set to true to create channel tags (v4.2.9-develop.1 in channel next → image:next)</td>
    </tr>
</table>


## 🙆🏼‍♂️ Copyright and license

Copyright (c) Sebastian Pekarek under the [MIT license](LICENSE).
