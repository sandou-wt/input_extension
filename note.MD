## 取值
- `const currentFristWord = currentWord[0]`和
  `const currentFristWord = currentWord.value.charAt(0)`有什么区别？

  - const currentFirstWord = currentWord[0]：这个语句假设 currentWord 是一个字符串。使用索引 [0] 直接访问字符串的第一个字符，这是一种常见的做法。这适用于字符串、数组等可通过索引访问的数据结构。
  - const currentFirstWord = currentWord.value.charAt(0)：这个语句假设 currentWord 是一个表示 HTML 元素的对象，并且您想要获取该元素的值（通常是用户输入的文本），然后获取该值的第一个字符。这适用于表单元素（如输入框）等包含 value 属性的对象。
  - 因此，选择使用哪一种形式取决于您要处理的数据类型。如果 `currentWord` 是字符串，那么第一种方式更为简洁。如果 `currentWord` 是包含 value 属性的 HTML 元素，那么第二种方式更为合适。


