console.log("Extension has started");

let storyBlock = document.querySelector('.stories_feed_items');

window.onload = function() {
  if(document.getElementsByClassName('stories_video').length) {
    eventAddBtnDownload();
  }
};

function eventAddBtnDownload() {
  let startSpawnDownloadBtn = setInterval(() => {
    let video = document.getElementsByClassName('stories_video');

    if(video.length) {
      let videoLink = video[0].getAttribute('src');

      let downloadBtnExist = document.getElementsByClassName('StoryMenuItem ui_actions_menu_item downloadBtn');
      let endStoryShow = document.getElementsByClassName('stories_layer shown');

      if(!endStoryShow.length) {
        clearInterval(startSpawnDownloadBtn);
      }

      if(!downloadBtnExist.length) {
        //скачать видео
        let downloadBtn = document.createElement('div');
        downloadBtn.className = 'StoryMenuItem ui_actions_menu_item downloadBtn';
        downloadBtn.textContent = 'Скачать';
        downloadBtn.addEventListener('click', async function() { await downloadVideo(videoLink); });

        //скопировать ссылку видео
        let linkVideoBtn = document.createElement('div');
        linkVideoBtn.className = 'StoryMenuItem ui_actions_menu_item';
        linkVideoBtn.textContent = 'Скоп. ссылку';
        linkVideoBtn.addEventListener('click', async function() {
           await navigator.clipboard.writeText(videoLink);
        });


        let storyBlock = document.getElementsByClassName('StoryViewerHeaderButton');
        let storyMenu;

        if(storyBlock.length === 2) {
          storyMenu = storyBlock[1].firstElementChild.firstElementChild;

          let oldElement = storyMenu.lastElementChild;
          storyMenu.removeChild(oldElement);

          storyMenu.append(downloadBtn);
          storyMenu.append(linkVideoBtn);
          storyMenu.append(oldElement);
        } else {
          storyMenu = storyBlock[0].firstElementChild.firstElementChild;

          storyMenu.append(downloadBtn);
          storyMenu.append(linkVideoBtn);
        }
      }
    }
  }, 500);
}

const downloadVideo = async (urlFull) => {
  try {
    const url = urlFull.split('?')[0];
    const nameFile = url.split('/')[url.split('/').length - 1];

    await fetch(url)
      .then(response => {
        if ((response.ok === true) && (response.status === 200)) {
          return response.blob();
        }
      })
      .then(data => {
        const url = window.URL.createObjectURL(data);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", nameFile);
        link.click();
      });
  } catch (e) {
    console.log(e)
  }
}

if(storyBlock) {
  storyBlock.addEventListener('click', function() { eventAddBtnDownload(); }, false);
}
