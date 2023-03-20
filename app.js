console.log("Addon is worked");

let startBlockOne = document.querySelector('.stories_feed_items');
// let startBlockTwo = document.querySelector('.MetaStoryItemPreview');

function evenAddBtnDownload() {
  let startSpawnDownloadBtn = setInterval(() => {
    let video = document.getElementsByClassName('stories_video');

    if(video.length) {
      let downloadBtnExist = document.getElementsByClassName('StoryMenuItem ui_actions_menu_item downloadBtn');
      let endStoryShow = document.getElementsByClassName('stories_layer shown');

      if(!endStoryShow.length) {
        clearInterval(startSpawnDownloadBtn);
      }

      if(!downloadBtnExist.length) {
        let downloadBtn = document.createElement('div');
        downloadBtn.className = 'StoryMenuItem ui_actions_menu_item downloadBtn';
        downloadBtn.textContent = 'Скачать';
        downloadBtn.addEventListener('click', async function() { await downloadVideo(video[0].getAttribute('src')); });

        let storyBlock = document.getElementsByClassName('StoryViewerHeaderButton');
        let storyMenu;

        if(storyBlock.length == 2) {
          storyMenu = storyBlock[1].firstElementChild.firstElementChild;

          let oldElement = storyMenu.lastElementChild;
          storyMenu.removeChild(oldElement);

          storyMenu.append(downloadBtn);
          storyMenu.append(oldElement);
        } else {
          storyMenu = storyBlock[0].firstElementChild.firstElementChild;
          storyMenu.append(downloadBtn);
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


startBlockOne.addEventListener('click', function() { evenAddBtnDownload(); }, false);
