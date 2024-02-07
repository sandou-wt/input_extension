let currentWordIndex = 0;
let words = []; // 存储从JSON文件加载的单词数据

// 在页面加载时初始化输入框内容
window.addEventListener("load", function () {
  fetchWordData(); // 加载词库数据
});

function fetchWordData() {
  fetch("webword.json") // 加载JSON文件
    .then((response) => response.json()) // 解析JSON数据
    .then((data) => {
      words = data; // 存储从JSON文件加载的数据

      // 随机排序数组
      words = shuffleArray(words);

      if (words.length > 0) {
        // 显示第一个单词和解释
        displayWordAndDefinition();
      }
    })
    .catch((error) => {
      console.error("Error loading word data: ", error);
    });
}

// 辅助函数：随机排序数组
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function displayWordAndDefinition() {
  const currentWordObject = words[currentWordIndex];
  const word = currentWordObject.word;
  const translations = currentWordObject.translations;

  // 构建单词和解释的显示字符串
  let displayText = `${word}\n`;
  translations.forEach((translationObj) => {
    displayText += `\n- ${translationObj.translation} \n-`;
  });


  document.getElementById("wordDisplay").textContent = displayText;
}

document.addEventListener("keydown", function (event) {
  let typedCharUpper = '';
  let typedCharLower = '';
  const currentWord = words[currentWordIndex].word;
  if (event.key === 'Shift'|| event.key === 'CapsLock') {
    // 如果是Shift或CapLock键，直接返回，不执行后续逻辑
    return;
  }
  const key = event.key;
  typedCharUpper = key.toUpperCase();
  typedCharLower = key.toLowerCase();
  const currentPosition = document.getElementById("inputField").value.length;

  if (typedCharUpper === currentWord[currentPosition] || typedCharLower === currentWord[currentPosition]) {
    // 输入正确的字符
    document.getElementById("inputField").style.color = "green"; // 将字体颜色设置为绿色
  } else {
    event.preventDefault();
    document.getElementById("inputField").style.color = "gray"; // 将字体颜色设置为灰色
    document.getElementById("inputField").value = ""; // 清空输入框内容
  }

  if (event.key === "Enter" && currentPosition === currentWord.length) {
    currentWordIndex++;
    if (currentWordIndex < words.length) {
      document.getElementById("inputField").value = "";
      displayWordAndDefinition(); // 显示下一个单词和解释
    } else {
      alert("恭喜！你完成了所有单词。");
    }
  }
});
