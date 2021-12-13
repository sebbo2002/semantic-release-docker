'use strict';

import {getBaseImage, getMajorAndMinorPart, getTagTasks, isPreRelease, parseConfig, tagImage, publish} from '../../src/lib';
import assert from 'assert';

describe('@sebbo2002/semantic-release-docker', function () {
    describe('parseConfig', function () {
        it('should work without any tags', function () {
            const result = parseConfig({
                images: ['ubuntu']
            });
            assert.deepStrictEqual(result, {
                images: ['ubuntu'],
                tag: {
                    latest: true,
                    major: true,
                    minor: true,
                    version: true,
                    channel: true
                }
            });
        });
        it('should work with images string', function () {
            const result = parseConfig({
                images: 'ubuntu'
            });
            assert.deepStrictEqual(result, {
                images: ['ubuntu'],
                tag: {
                    latest: true,
                    major: true,
                    minor: true,
                    version: true,
                    channel: true
                }
            });
        });
        it('should merge tags', function () {
            const result = parseConfig({
                images: ['ubuntu'],
                tag: {
                    minor: false
                }
            });
            assert.deepStrictEqual(result, {
                images: ['ubuntu'],
                tag: {
                    latest: true,
                    major: true,
                    minor: false,
                    version: true,
                    channel: true
                }
            });
        });
        it('should throw error without image defined', function () {
            assert.throws(() => {
                // @ts-ignore
                parseConfig({});
            }, /Configuration invalid: No image defined!/);
        });
    });
    describe('getBaseImage', function() {
        it('alpine', function () {
            assert.strictEqual(getBaseImage('alpine'), 'alpine');
        });
        it('ubuntu:14', function () {
            assert.strictEqual(getBaseImage('ubuntu:14'), 'ubuntu');
        });
        it('sebbo2002/test:14.04', function () {
            assert.strictEqual(getBaseImage('sebbo2002/test:14.04'), 'sebbo2002/test');
        });
        it('ubuntu@14', function () {
            assert.strictEqual(getBaseImage('ubuntu@14'), 'ubuntu');
        });
        it('sebbo2002/test@14.04', function () {
            assert.strictEqual(getBaseImage('sebbo2002/test@14.04'), 'sebbo2002/test');
        });
        it('alpine@sha256:aaaaf56b44807c64d294e6c8059b479f35350b454492398225034174808d1726', function () {
            assert.strictEqual(getBaseImage(
                'alpine@sha256:aaaaf56b44807c64d294e6c8059b479f35350b454492398225034174808d1726'
            ), 'alpine');
        });
        it('quay.io/signalfuse/zookeeper', function () {
            assert.strictEqual(getBaseImage('quay.io/signalfuse/zookeeper'), 'quay.io/signalfuse/zookeeper');
        });
        it('internal.mycorp.com:5000/revealjs', function () {
            assert.strictEqual(
                getBaseImage('internal.mycorp.com:5000/revealjs'),
                'internal.mycorp.com:5000/revealjs'
            );
        });
        it('internal.mycorp.com:5000/revealjs:3.4.5-3-develop.5', function () {
            assert.strictEqual(
                getBaseImage('internal.mycorp.com:5000/revealjs:3.4.5-3-develop.5'),
                'internal.mycorp.com:5000/revealjs'
            );
        });
    });
    describe('isPreRelease', function() {
        it('with release', function () {
            const result = isPreRelease({
                logger: {
                    log: () => {},
                    error: () => {}
                },
                env: {},
                nextRelease: {
                    type: 'patch',
                    version: '8.2.6',
                    notes: '',
                    gitHead: '',
                    gitTag: '',
                    name: ''
                }
            });

            assert.strictEqual(result, false);
        });
        it('with pre-release', function () {
            const result = isPreRelease({
                logger: {
                    log: () => {},
                    error: () => {}
                },
                env: {},
                nextRelease: {
                    type: 'prerelease',
                    version: '8.2.6-develop.1',
                    notes: '',
                    gitHead: '',
                    gitTag: '',
                    name: ''
                }
            });

            assert.strictEqual(result, true);
        });
        it('without release', function () {
            const result = isPreRelease({
                logger: {
                    log: () => {},
                    error: () => {}
                },
                env: {}
            });

            assert.strictEqual(result, false);
        });
    });
    describe('getMajorAndMinorPart', function () {
        it('undefined', function() {
            assert.deepStrictEqual(getMajorAndMinorPart(undefined), {
                major: null,
                minor: null
            });
        });
        it('4.6.1', function() {
            assert.deepStrictEqual(getMajorAndMinorPart('4.6.1'), {
                major: '4',
                minor: '6'
            });
        });
        it('4.6.1-develop.12', function() {
            assert.deepStrictEqual(getMajorAndMinorPart('4.6.1-develop.12'), {
                major: '4',
                minor: '6'
            });
        });
    });
    describe('getTagTasks', function () {
        it('should quietly abort if no release should be triggered', function () {
            getTagTasks({
                images: ['ubuntu'],
                tag: {
                    latest: true,
                    major: true,
                    minor: true,
                    version: true,
                    channel: true
                }
            }, {
                logger: {
                    log: () => {},
                    error: () => {}
                },
                env: {}
            });
        });
        it('patch release', function () {
            const result = getTagTasks({
                images: [
                    'alpine@sha256:aaaaf56b44807c64d294e6c8059b479f35350b454492398225034174808d1726',
                    'sebbo2002/test:1234567'
                ],
                tag: {
                    latest: true,
                    major: true,
                    minor: true,
                    version: true,
                    channel: true
                }
            }, {
                logger: {
                    log: () => {},
                    error: () => {}
                },
                env: {},
                nextRelease: {
                    type: 'patch',
                    version: '8.2.6',
                    notes: '',
                    gitHead: '',
                    gitTag: '',
                    name: ''
                }
            });

            assert.deepStrictEqual(result, [
                {
                    input: 'alpine@sha256:aaaaf56b44807c64d294e6c8059b479f35350b454492398225034174808d1726',
                    output: 'alpine:8.2.6'
                },
                {
                    input: 'alpine@sha256:aaaaf56b44807c64d294e6c8059b479f35350b454492398225034174808d1726',
                    output: 'alpine:latest'
                },
                {
                    input: 'alpine@sha256:aaaaf56b44807c64d294e6c8059b479f35350b454492398225034174808d1726',
                    output: 'alpine:8'
                },
                {
                    input: 'alpine@sha256:aaaaf56b44807c64d294e6c8059b479f35350b454492398225034174808d1726',
                    output: 'alpine:8.2'
                },
                {
                    input: 'sebbo2002/test:1234567',
                    output: 'sebbo2002/test:8.2.6'
                },
                {
                    input: 'sebbo2002/test:1234567',
                    output: 'sebbo2002/test:latest'
                },
                {
                    input: 'sebbo2002/test:1234567',
                    output: 'sebbo2002/test:8'
                },
                {
                    input: 'sebbo2002/test:1234567',
                    output: 'sebbo2002/test:8.2'
                }
            ]);
        });
        it('pre release', function () {
            const result = getTagTasks({
                images: [
                    'alpine@sha256:aaaaf56b44807c64d294e6c8059b479f35350b454492398225034174808d1726',
                    'sebbo2002/test:1234567'
                ],
                tag: {
                    latest: true,
                    major: true,
                    minor: true,
                    version: true,
                    channel: true
                }
            }, {
                logger: {
                    log: () => {},
                    error: () => {}
                },
                env: {},
                nextRelease: {
                    type: 'prerelease',
                    version: '8.2.6-develop.3',
                    notes: '',
                    name: '',
                    gitHead: '',
                    gitTag: '',
                    channel: 'next'
                }
            });

            assert.deepStrictEqual(result, [
                {
                    input: 'alpine@sha256:aaaaf56b44807c64d294e6c8059b479f35350b454492398225034174808d1726',
                    output: 'alpine:8.2.6-develop.3'
                },
                {
                    input: 'alpine@sha256:aaaaf56b44807c64d294e6c8059b479f35350b454492398225034174808d1726',
                    output: 'alpine:next'
                },
                {
                    input: 'sebbo2002/test:1234567',
                    output: 'sebbo2002/test:8.2.6-develop.3'
                },
                {
                    input: 'sebbo2002/test:1234567',
                    output: 'sebbo2002/test:next'
                }
            ]);
        });
    });
    describe('tagImage', function() {
        it('tag ubuntu', async function() {
            await tagImage('alpine', 'alpine:tagging-test');
        });
    });
    describe('publish', function() {
        it('should return false if no release is scheduled', async function() {
            const result = await publish({
                images: []
            }, {
                logger: {
                    log: () => {},
                    error: () => {}
                },
                env: {}
            });

            assert.strictEqual(result, false);
        });
        it('should return false if there\'s nothing to do', async function() {
            const result = await publish({
                images: 'foo/bar:1234',
                tag: {
                    latest: false,
                    major: false,
                    minor: false,
                    version: false,
                    channel: false
                }
            }, {
                logger: {
                    log: () => {},
                    error: () => {}
                },
                env: {},
                nextRelease: {
                    type: 'patch',
                    version: '8.2.7',
                    notes: '',
                    gitHead: '',
                    gitTag: '',
                    name: ''
                }
            });

            assert.strictEqual(result, false);
        });
    });
});
