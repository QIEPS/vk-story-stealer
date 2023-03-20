console.log("Addon is worked");

let startBlock = document.querySelector('.stories_feed_items_wrap');
startBlock.addEventListener('click', function () {
  let startSpawnDownloadBtn = setInterval(() => {
    let downloadBtnExist = document.getElementsByClassName('StoryMenuItem ui_actions_menu_item downloadBtn');
    let endStoryShow = document.getElementsByClassName('stories_layer shown');

    if(!endStoryShow.length) {
      clearInterval(startSpawnDownloadBtn);
    }

    if(!downloadBtnExist.length) {
      let storyBlock = document.getElementsByClassName('StoryViewerHeaderButton');
      let storyMenu = storyBlock[0].firstElementChild.firstElementChild;

      let downloadBtn = document.createElement('div');
      downloadBtn.className = 'StoryMenuItem ui_actions_menu_item downloadBtn';
      downloadBtn.textContent = 'Скачать';

      storyMenu.append(downloadBtn);
    }
  }, 500);
});
