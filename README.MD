# SingleFile MV3 CDP Patched

This is a fork of [gildas-lormeau/SingleFile-MV3](https://github.com/gildas-lormeau/SingleFile-MV3) patched to allow programmatic control (I use the Chrome DevTools Protocol for this).

## How to use
To start saving a page with SingleFile, run the following code (via DevTools or the DevTools Protocol client):
```js
chrome.runtime.sendMessage('cfgkglpohbeemchjciegabidljjmnidf', 'save-page');
```

## What was changed
1. The extension key is generated and hardcoded into the manifest so that the extension has a permanent identifier (`cfgkglpohbeemchjciegabidljjmnidf`).
2. The built-in downloader (with browser.downloads.download) has been replaced because it does not cause the CDP Browser.onDownloadWillBegin and Browser.onDownloadProgress events to be fired, which would allow tracking the completion of the page save.
3. The extension is configured (```externally_connectable``` section in the manifest) to receive events from outside - this is necessary to be able to start saving, see [How to Use](#how-to-use).
4. Saving videos (```blockVideos``` configuration) is now enabled by default - this is for my personal convenience ;)

## Misc
### How extension key was generated
1. Create private key called key.pem
   ```2>/dev/null openssl genrsa 2048 | openssl pkcs8 -topk8 -nocrypt -out key.pem```
2. Generate string to be used as "key" in manifest.json (outputs to stdout)
   ```2>/dev/null openssl rsa -in key.pem -pubout -outform DER | openssl base64 -A```
3. Calculate extension ID (outputs to stdout)
   ```2>/dev/null openssl rsa -in key.pem -pubout -outform DER |  shasum -a 256 | head -c32 | tr 0-9a-f a-p```

[Source](https://stackoverflow.com/a/23877974/663322)
