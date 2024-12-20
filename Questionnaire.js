/**空问卷状态--->新建问卷状态 */
const createQuestionnaire = document.querySelector('.createQuestionnaire');
const creating = document.querySelector('.creating');
createQuestionnaire.addEventListener('click',function(){
    createQuestionnaire.parentElement.style.display = 'none';
    creating.style.display = 'block';
})

/*添加问题按钮，点击之后才会弹出三种类型供选择*/
const adding = document.querySelector('.adding');
const questionStyles = document.querySelector('.questionStyles');
adding.addEventListener('click', function () {
    questionStyles.style.display = 'block';
})

/*接下来选择题目的类型*/
const questionSingle = document.querySelector('.questionSingle');
const questionMultiple = document.querySelector('.questionMultiple');
const questionText = document.querySelector('.questionText');
const questionStyle = document.querySelector('.questionStyle');
const parent = document.querySelector('.questionStyles');

var questionNum = 0;//单个问卷中题目的序号
var inputID = 0;
//当按下问题按钮时，三种问题的情况处理，针对html和css
function questionAdd(){
    questionNum++;

    if(this === questionSingle){
        
        //创建一个问题的盒子
        const radio = document.createElement('div');
        radio.style.paddingTop = '5px';
        radio.style.paddingLeft = '5px';
        radio.style.marginTop = '5px';

        radio.className = 'choiceBox radio';
        radio.classList.add('choiceBox');
        
        //问题
        const questionTitle = document.createElement('div');
        questionTitle.className = 'questionTitle';
        //问题的序号
        const numLabel = document.createElement('label');
        numLabel.textContent = questionNum + '. (单选题)';
        //问题题目的文本框
        const questionName = document.createElement('input');
        questionName.id = 'input' + inputID++;
        numLabel.htmlFor = questionName.id;
        questionName.className = 'choiceNameBox';
        questionName.style.type = 'text';
        questionName.placeholder = '请输入单选题题目';
        questionTitle.appendChild(numLabel);
        questionTitle.appendChild(questionName);
        //问题的增加按钮
        const addButton = document.createElement('button');
        addButton.textContent = '添加选项';
        addButton.style.marginLeft = '20px';
        addButton.style.backgroundColor = 'rgb(211, 211, 211)';
        questionTitle.appendChild(addButton);
        radio.appendChild(questionTitle);

        //问题选项
        //当点击"问题的增加按钮"时，增加一个新问题选项
        var questionOptionNum = 'A';//单个题目中选项的序号
        addButton.addEventListener('click',function(){
            const radioBox = this.parentNode.parentNode; // 获取addButton按钮的父元素.choiceBox
            const newOption = document.createElement('div');
            newOption.style.marginTop = '5px';
            newOption.style.display = 'flex';
            //单选题勾选框
            const optionRadioInput = document.createElement('input');
            optionRadioInput.id = 'input' + inputID++;
            optionRadioInput.className = 'questionChoiceInput';
            optionRadioInput.type = 'radio';
            optionRadioInput.name = 'radioOption';
            //单选题选项内容输入框
            const optionTextInput = document.createElement('input');
            optionTextInput.id = 'input' + inputID++;
            optionTextInput.className = 'optionNameInput';/////////////////////////////////
            optionTextInput.style = 'text';
            optionTextInput.placeholder = '请输入单选题选项内容';
            optionTextInput.style.width = '60%';

            // 创建一个用于显示选项序号的label元素
            const optionNum = document.createElement('label');
            optionNum.style.width = '26px';
            optionNum.style.textAlign = 'center';
            optionNum.htmlFor = optionRadioInput.id;
            optionNum.className = 'optionNums';
            optionNum.textContent = ' ' + questionOptionNum + '. ';
            questionOptionNum = String.fromCharCode(questionOptionNum.charCodeAt(0) + 1);// 通过字符编码转换来更新下一个选项序号
            //构建新的选项
            newOption.appendChild(optionRadioInput);
            newOption.appendChild(optionNum);
            newOption.appendChild(optionTextInput);
            //将构建完成的选项个增加到.choiceBox中

            // 计算所有子选项的总高度
            var totalHeight = 0;
            radioBox.querySelectorAll('div').forEach((option) => {
                // const optionRect = option.getBoundingClientRect();
                const optionCSS = window.getComputedStyle(option);
                totalHeight += parseFloat(optionCSS.height) + parseFloat(optionCSS.marginTop);
            })
            // 设置父盒子的高度
            radioBox.style.height = (totalHeight + 50) + 'px';

            //选项后面的删除按钮
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '删除';
            deleteButton.style.marginLeft = '20px';
            deleteButton.style.backgroundColor = 'rgb(211, 211, 211)';
            newOption.appendChild(deleteButton);
            radioBox.appendChild(newOption);

            // 当点击删除选项之后，删除一个选项
            deleteButton.addEventListener('click', function () {

                // 通过字符编码转换来更新下一个选项序号，删除之后要将序号还原一次
                // questionOptionNum = String.fromCharCode(questionOptionNum.charCodeAt(0) - 1);
                
                const optionToRemove = this.parentNode // 获取当前点击的删除按钮的父元素，即要删除的选项所在的div

                // 设置父盒子的高度,原radioBox高度减去要删除的选项的高度
                const optionToRemoveCSS = window.getComputedStyle(optionToRemove);
                const radioBoxCSS = window.getComputedStyle(radioBox);
                radioBox.style.height = (parseFloat(radioBoxCSS.height) - parseFloat(optionToRemoveCSS.height) - parseFloat(optionToRemoveCSS.marginTop)) + 'px';

                optionToRemove.remove(); // 删除当前点击的删除按钮的父元素，即要删除的选项所在的div
                
                //更新所有选项的选项序号
                questionOptionNum = 'A';
                radioBox.querySelectorAll('.optionNums').forEach((optionNum) => {
                    optionNum.textContent = ' ' + questionOptionNum + '. ';
                    questionOptionNum = String.fromCharCode(questionOptionNum.charCodeAt(0) + 1);// 通过字符编码转换来更新下一个选项序号
                });
            })
        });
        //将构建好的问题radio插入表格parent中，questionStyle作为插入位置参考，即插入到questionStyle之前
        parent.insertBefore(radio, questionStyle);
    }
    else if(this === questionMultiple){
        //创建一个问题的盒子
        const checkbox = document.createElement('div');
        checkbox.style.paddingTop = '5px';
        checkbox.style.paddingLeft = '5px';
        checkbox.style.marginTop = '5px';
        checkbox.className = 'choiceBox checkbox';
        checkbox.classList.add('choiceBox');
        
        //问题
        const questionTitle = document.createElement('div');
        questionTitle.className = 'questionTitle';
        //问题的序号
        const numLabel = document.createElement('label');
        numLabel.textContent = questionNum + '. (多选题)';
        //问题题目的文本框
        const questionName = document.createElement('input');
        questionName.id = 'input' + inputID++;
        numLabel.htmlFor = questionName.id;

        questionName.className = 'choiceNameBox';
        questionName.style.type = 'text';
        questionName.placeholder = '请输入多选题题目';
        questionTitle.appendChild(numLabel);
        questionTitle.appendChild(questionName);
        //问题的增加按钮
        const addButton = document.createElement('button');
        addButton.textContent = '添加选项';
        addButton.style.marginLeft = '20px';
        addButton.style.backgroundColor = 'rgb(211, 211, 211)';
        questionTitle.appendChild(addButton);
        checkbox.appendChild(questionTitle);

        //问题选项
        //当点击"问题的增加按钮"时，增加一个新问题选项
        var questionOptionNum = 'A';//单个题目中选项的序号
        addButton.addEventListener('click',function(){
            const checkboxBox = this.parentNode.parentNode; // 获取addButton按钮的父元素.choiceBox
            const newOption = document.createElement('div');
            newOption.style.marginTop = '5px';
            newOption.style.display = 'flex';
            //单选题勾选框
            const optioncheckboxInput = document.createElement('input');
            optioncheckboxInput.id = 'input' + inputID++;
            optioncheckboxInput.className = 'questionChoiceInput';
            optioncheckboxInput.type = 'checkbox';
            optioncheckboxInput.name = 'checkboxOption';
            //单选题选项内容输入框
            const optionTextInput = document.createElement('input');
            optionTextInput.id = 'input' + inputID++;
            optionTextInput.className = 'optionNameInput';/////////////////////////////////
            optionTextInput.style = 'text';
            optionTextInput.placeholder = '请输入多选题选项内容';
            optionTextInput.style.width = '60%';

            // 创建一个用于显示选项序号的label元素
            const optionNum = document.createElement('label');
            optionNum.style.width = '26px';
            optionNum.style.textAlign = 'center';
            optionNum.htmlFor = optioncheckboxInput.id;
            optionNum.className = 'optionNums'
            optionNum.textContent = ' ' + questionOptionNum + '. ';
            questionOptionNum = String.fromCharCode(questionOptionNum.charCodeAt(0) + 1);// 通过字符编码转换来更新下一个选项序号
            //构建新的选项
            newOption.appendChild(optioncheckboxInput)
            newOption.appendChild(optionNum);
            newOption.appendChild(optionTextInput);

            // 计算所有子选项的总高度
            var totalHeight = 0;
            checkboxBox.querySelectorAll('div').forEach((option) => {
                const optionCSS = window.getComputedStyle(option);
                totalHeight += parseFloat(optionCSS.height) + parseFloat(optionCSS.marginTop);            })
            // 设置父盒子的高度
            checkboxBox.style.height = (totalHeight + 50) + 'px';

            //选项后面的删除按钮
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '删除';
            deleteButton.style.marginLeft = '20px';
            deleteButton.style.backgroundColor = 'rgb(211, 211, 211)';
            newOption.appendChild(deleteButton);
            checkboxBox.appendChild(newOption);

            // 当点击删除选项之后，删除一个选项
            deleteButton.addEventListener('click', function () {

                // 通过字符编码转换来更新下一个选项序号，删除之后要将序号还原一次
                // questionOptionNum = String.fromCharCode(questionOptionNum.charCodeAt(0) - 1);
                
                const optionToRemove = this.parentNode // 获取当前点击的删除按钮的父元素，即要删除的选项所在的div

                // 设置父盒子的高度,原radioBox高度减去要删除的选项的高度
                const optionToRemoveCSS = window.getComputedStyle(optionToRemove);
                const checkboxBoxCSS = window.getComputedStyle(checkboxBox);
                checkboxBox.style.height = (parseFloat(checkboxBoxCSS.height) - parseFloat(optionToRemoveCSS.height) - parseFloat(optionToRemoveCSS.marginTop)) + 'px';
                optionToRemove.remove(); // 删除当前点击的删除按钮的父元素，即要删除的选项所在的div
                
                //更新所有选项的选项序号
                questionOptionNum = 'A';
                checkboxBox.querySelectorAll('.optionNums').forEach((optionNum) => {
                    optionNum.textContent = ' ' + questionOptionNum + '. ';
                    questionOptionNum = String.fromCharCode(questionOptionNum.charCodeAt(0) + 1);// 通过字符编码转换来更新下一个选项序号
                });
            })
        });
        //将构建好的问题radio插入表格parent中，questionStyle作为插入位置参考，即插入到questionStyle之前
        parent.insertBefore(checkbox, questionStyle);
    }
    else if(this === questionText){
        //创建一个问题的盒子
        const text = document.createElement('div');
        text.style.paddingTop = '5px';
        text.style.paddingLeft = '5px';
        text.style.marginTop = '5px';
        text.className = 'choiceBox text';
        text.classList.add('choiceBox');

        const questionTitle = document.createElement('div');
        const numLabel = document.createElement('label');
        numLabel.textContent = questionNum + '. (文本题)';
        //盒子里包含的问题题目文本框
        const questionTextInput = document.createElement('input');
        questionTextInput.id = 'input' + inputID++;
        numLabel.htmlFor = questionTextInput.id;
        questionTextInput.className = 'choiceNameBox';
        questionTextInput.style.type = 'text';
        questionTextInput.classList.add('choiceNameBox');
        questionTitle.appendChild(numLabel);
        questionTitle.appendChild(questionTextInput);
        
        //设置一个按钮，判断该题是否为必答题
        //先来一个复选框
        const checkboxLabel = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.id = 'input' + inputID++;
        checkboxLabel.htmlFor = checkbox.id;
        checkbox.type = 'checkbox';
        checkbox.style.marginLeft = '5px';
        checkboxLabel.textContent = '此题是否为必答';
        checkboxLabel.style.marginLeft = '5px';
        questionTitle.appendChild(checkbox);
        questionTitle.appendChild(checkboxLabel);
        text.appendChild(questionTitle);

        parent.insertBefore(text, questionStyle)
    }

    if(questionNum == 1){

    }
}

//----------------------------------------------------------------------//

questionSingle.addEventListener('click', questionAdd);
questionMultiple.addEventListener('click', questionAdd);
questionText.addEventListener('click', questionAdd);