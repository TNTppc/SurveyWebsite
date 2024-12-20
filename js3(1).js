
/**空问卷状态--->新建问卷状态 */
const createQuestionnaire = document.querySelector('.create-questionnaire')
const creating = document.querySelector('.creating')
createQuestionnaire.addEventListener('click', function () {
    createQuestionnaire.parentElement.style.display = 'none'//将此界面隐藏
    creating.style.display = 'block'//显示新建界面
})

/*添加问题按钮，点击之后才会弹出三种类型供选择*/
const adding = document.querySelector('.adding')
adding.addEventListener('click', function () {
    const questionStyles = document.querySelector('.question-styles')
    questionStyles.style.display = 'block'
})

/*接下来选择题目的类型*/
const questionStyle1 = document.querySelector('.question-style1')
const questionStyle2 = document.querySelector('.question-style2')
const questionStyle3 = document.querySelector('.question-style3')
const questionStyle = document.querySelector('.question-style')
const parent = document.querySelector('.question-styles')

let questionNum = 0;//单个问卷中题目的序号
//三种情况分别处理
function questionClick() {

    let questionOptionNum = 'A' //单个题目中选项的序号

    if (this === questionStyle1) {
        questionNum++

        //创建一个问题的盒子
        const radio = document.createElement('div')
        radio.className = 'choice-box'
        radio.classList.add('choice-box')
        radio.id = 'radio'

        const numSpan = document.createElement('span')
        numSpan.textContent = questionNum + '. '
        radio.appendChild(numSpan)

        /*/新建了一个问题对象
        const newQuestion = {...questionStructure}
        newQuestion.className = `questionnaire${questionNum}`
        questionNum++*/

        //盒子里包含的问题题目文本框
        const questionName = document.createElement('input')
        questionName.className = 'choice-name-box'
        questionName.style.type = 'text'
        questionName.classList.add('choice-name-box')
        radio.appendChild(questionName)

        /*
            const latestQuestionnaireIndex = questionnaireNum - 1;
            const latestQuestionnaire = questionnaires[latestQuestionnaireIndex];
       */
        //盒子里包含的添加选项按钮
        const addButton = document.createElement('button')
        addButton.textContent = '添加选项'
        addButton.style.marginLeft = '20px'
        addButton.style.backgroundColor = 'rgb(211, 211, 211)'
        radio.appendChild(addButton)

        //当点击添加按钮时，增加一个新选项
        addButton.addEventListener('click', function () {
            const radioBox = this.parentNode; // 获取addButton按钮的父元素.choice-box
            const newOption = document.createElement('div')
            const optionInput = document.createElement('input')

            optionInput.className = 'question-choice-input'//选择类型类名

            optionInput.type = 'radio'
            optionInput.name = 'radio-option'
            const optionName = document.createElement('input')
            optionName.className = 'optionName-input'/////////////////////////////////
            optionName.style = 'text'
            optionName.style.width = '60%'

            // 创建一个用于显示选项序号的span元素
            const optionNumSpan = document.createElement('span')
            optionNumSpan.textContent = questionOptionNum
            newOption.appendChild(optionNumSpan)


            newOption.appendChild(optionInput)
            newOption.appendChild(optionName)

            radioBox.appendChild(newOption)

            // 通过字符编码转换来更新下一个选项序号
            const charCode = questionOptionNum.charCodeAt(0);
            questionOptionNum = String.fromCharCode(charCode + 1);

            // 计算所有子选项的总高度
            let totalHeight = 0
            const options = radioBox.querySelectorAll('div')
            options.forEach((option) => {
                const rect = option.getBoundingClientRect()
                totalHeight += rect.height
            })
            // 设置父盒子的高度
            radioBox.style.height = (totalHeight + 50) + 'px'

            //选项后面的删除按钮
            const deleteButton = document.createElement('button')
            deleteButton.textContent = '删除'
            deleteButton.style.marginLeft = '20px'
            deleteButton.style.backgroundColor = 'rgb(211, 211, 211)'
            newOption.appendChild(deleteButton)

            // 当点击删除选项之后，删除一个选项
            deleteButton.addEventListener('click', function () {

                // 通过字符编码转换来更新下一个选项序号，删除之后要将序号还原一次
                const charCode = questionOptionNum.charCodeAt(0);
                questionOptionNum = String.fromCharCode(charCode - 1);

                const optionToRemove = this.parentNode // 获取当前点击的删除按钮的父元素，即要删除的选项所在的div
                optionToRemove.remove() // 移除这个选项对应的div元素

                // 重新计算剩余选项的总高度，更新父盒子高度
                let newTotalHeight = 0
                const remainingOptions = radioBox.querySelectorAll('div')
                remainingOptions.forEach((remainingOption) => {
                    const rect = remainingOption.getBoundingClientRect()
                    newTotalHeight += rect.height;
                })
                radioBox.style.height = (newTotalHeight + 50) + 'px'
            })

        })
        parent.insertBefore(radio, questionStyle)

    } else if (this === questionStyle2) {

        questionNum++

        //创建一个问题的盒子
        const checkbox = document.createElement('div')
        checkbox.className = 'choice-box'
        checkbox.classList.add('choice-box')
        checkbox.id = 'checkbox'

        //创建一个span元素来存放题目序号
        const numSpan = document.createElement('span')
        numSpan.textContent = ' ' + questionNum + '. '
        checkbox.appendChild(numSpan)

        //盒子里包含的问题题目文本框
        const questionName = document.createElement('input')
        questionName.className = 'choice-name-box'
        questionName.style.type = 'text'
        questionName.classList.add('choice-name-box')
        checkbox.appendChild(questionName)

        //盒子里包含的添加选项按钮
        const addButton = document.createElement('button')
        addButton.textContent = '添加选项'
        addButton.style.marginLeft = '20px'
        addButton.style.backgroundColor = 'rgb(211, 211, 211)'
        checkbox.appendChild(addButton)

        //当点击添加按钮时，增加一个新选项
        addButton.addEventListener('click', function () {
            const checkboxBox = this.parentNode; // 获取addButton按钮的父元素.choice-box
            const newOption = document.createElement('div')
            const optionInput = document.createElement('input')

            optionInput.className = 'question-choice-input'//选择类型类名

            optionInput.type = 'checkbox'
            optionInput.name = 'checkbox-option'
            const optionName = document.createElement('input')
            optionName.className = 'optionName-input'
            //optionName.className = 'optionName'
            optionName.style = 'text'
            optionName.style.width = '60%'
            //newOption.style.border = '2px solid red'

            // 创建一个用于显示选项序号的span元素
            const optionNumSpan = document.createElement('span')
            optionNumSpan.textContent = questionOptionNum
            newOption.appendChild(optionNumSpan)


            newOption.appendChild(optionInput)
            newOption.appendChild(optionName)

            checkboxBox.appendChild(newOption)

            // 通过字符编码转换来更新下一个选项序号
            const charCode = questionOptionNum.charCodeAt(0)
            questionOptionNum = String.fromCharCode(charCode + 1)

            // 计算所有子选项的总高度
            let totalHeight = 0
            const options = checkboxBox.querySelectorAll('div')
            options.forEach((option) => {
                const rect = option.getBoundingClientRect()
                totalHeight += rect.height
            })
            // 设置父盒子的高度
            checkboxBox.style.height = (totalHeight + 50) + 'px'

            //选项后面的删除按钮
            const deleteButton = document.createElement('button')
            deleteButton.textContent = '删除'
            deleteButton.style.marginLeft = '20px'
            deleteButton.style.backgroundColor = 'rgb(211, 211, 211)'
            newOption.appendChild(deleteButton)

            // 当点击删除选项之后，删除一个选项
            deleteButton.addEventListener('click', function () {

                // 通过字符编码转换来更新下一个选项序号，删除之后要将序号还原一次
                const charCode = questionOptionNum.charCodeAt(0);
                questionOptionNum = String.fromCharCode(charCode - 1);

                const optionToRemove = this.parentNode // 获取当前点击的删除按钮的父元素，即要删除的选项所在的div
                optionToRemove.remove() // 移除这个选项对应的div元素

                // 重新计算剩余选项的总高度，更新父盒子高度
                let newTotalHeight = 0
                const remainingOptions = checkboxBox.querySelectorAll('div')
                remainingOptions.forEach((remainingOption) => {
                    const rect = remainingOption.getBoundingClientRect()
                    newTotalHeight += rect.height
                })
                checkboxBox.style.height = (newTotalHeight + 50) + 'px'
            })
        })

        parent.insertBefore(checkbox, questionStyle)
    } else if (this === questionStyle3) {//文本题没有添加和删除按钮

        questionNum++

        //创建一个问题的盒子
        const text = document.createElement('div')
        text.className = 'choice-box'
        text.classList.add('choice-box')
        text.id = 'text'

        const numSpan = document.createElement('span')
        numSpan.textContent = questionNum + '. '
        text.appendChild(numSpan)

        //盒子里包含的问题题目文本框
        const questionName = document.createElement('input')
        questionName.className = 'choice-name-box'
        questionName.style.type = 'text'
        questionName.classList.add('choice-name-box')
        text.appendChild(questionName)

        //设置一个按钮，判断该题是否为必答题
        //先来一个复选框
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.style.marginLeft = '20px'
        const mustAnswerButton = document.createElement('button')
        mustAnswerButton.textContent = '此题是否为必答'
        mustAnswerButton.style.marginLeft = '20px'
        text.appendChild(checkbox)
        text.appendChild(mustAnswerButton)

        parent.insertBefore(text, questionStyle)
    }
}


//----------------------------------------------------------------------//

questionStyle1.addEventListener('click', questionClick);
questionStyle2.addEventListener('click', questionClick);
questionStyle3.addEventListener('click', questionClick);


/*对发布问卷逻辑的判断，截止日期小于当前日期则不能发布，弹出提示框*/
const button2 = document.querySelector('.button2')//发布问卷按钮

button2.addEventListener('click', function () {
    // 获取截止日期输入框元素，假设截止日期输入框有相应的类名或者属性便于选取，这里以类名为例
    const duDateInput = document.querySelector('.date input[type="date"]')
    const duDate = new Date(duDateInput.value) // 将输入的日期字符串转换为Date对象，便于比较

    // 获取当前日期
    const currentDate = new Date()

    if (duDate < currentDate) {
        alert('截止日期不能小于当前日期，无法发布问卷！')
        return // 直接返回，阻止后续发布问卷的操作执行
    }
    /*
        // 如果截止日期大于等于当前日期，这里可以添加后续真正发布问卷的逻辑代码，比如将问卷状态修改为已发布等操作
        // 例如（假设存在问卷状态标识元素和存储问卷状态的属性等相关代码逻辑）：
        const questionnaireStatusElement = document.querySelector('.questionnaire-status') // 假设这是展示问卷状态的元素
        questionnaireStatusElement.textContent = '已发布'
        const currentQuestionnaire = // 获取当前正在操作的问卷对象（根据实际情况确定获取方式，比如从某个全局变量或者通过DOM关联等获取）;
        currentQuestionnaire.statuu = '已发布'*/
})


/**---------------------------------------------------------------------------------------- */
/**问卷列表（已有问卷） */
//点击我的问卷之后跳转到该界面
const myQuestionnaire = document.querySelector('.my-questionnaire')
const myQuestionnaires = document.querySelector('.my-questionnaires')//‘我的问卷’的那个界面
myQuestionnaire.addEventListener('click', function () {
    //先隐藏当前的界面，懒得找当前是哪个界面了，直接全部隐藏qwq
    const createQuestionnaire = document.querySelector('.create-questionnaire')
    const creating = document.querySelector('.creating')
    //............还有界面后面再加

    createQuestionnaire.parentElement.style.display = 'none'//将此界面隐藏
    creating.style.display = 'none'//将此界面隐藏
    myQuestionnaires.style.display = 'block'
})

//‘我的问卷’中的‘新建问卷’按钮 ！注意，当点击了该按钮时，就应该创建一个问卷对象放在问卷数组里，后面再点击新建时，
//继续问卷数组后面加，当要对某个问卷操作时，根据数组的下标来查找目标问卷放在问卷数组中的哪个位置
const myQreateQuestionnaire = document.querySelector('.my-create-questionnaire')
//const myCreating = document.querySelector('.creating')
myQreateQuestionnaire.addEventListener('click', function () {
    myQreateQuestionnaire.parentElement.parentElement.style.display = 'none'//将此界面隐藏
    creating.style.display = 'block'//显示新建界面

    // 开始重置界面元素
    const questionStyles = document.querySelector('.question-styles')
    questionStyles.style.display = 'none' // 隐藏问题类型选择界面

    const questions = document.querySelectorAll('.choice-box')
    questions.forEach((question) => {
        question.remove(); // 删除已添加的所有问题盒子元素
    })

    const titleInput = document.querySelector('.new-title')
    titleInput.value = ''; // 清空问卷标题输入框

    const duDateInput = document.querySelector('.date input[type="date"]')
    duDateInput.value = ''; // 清空截止日期输入框

    const questionnaireTitle = document.querySelector('.new-title h1')//不改变文本的样式要具体到h1
    questionnaireTitle.textContent = '请在这里输入问卷的标题'//重置问卷标题
    // 重置结束
})


//深拷贝函数,这里是网上的解释
// 定义一个名为deepCopy的函数，它的作用是创建传入对象的深拷贝副本，以避免在操作新对象时影响到原始对象
function deepCopy(obj) {
    // 首先判断传入的参数obj是否不是对象类型（即基本数据类型，如number、string、boolean等）或者obj本身为null
    // 如果是这种情况，直接返回该参数本身，因为基本数据类型和null不需要进行拷贝操作，直接返回
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    // 根据传入对象的类型来初始化用于存储拷贝后数据的变量copy
    // 如果obj是数组类型（通过Array.isArray方法判断），则创建一个空数组作为copy，用于后续存储拷贝的数组元素
    // 如果obj是普通对象类型（不是数组的其他对象），则创建一个空对象作为copy，用于后续存储拷贝的对象属性
    let copy = Array.isArray(obj) ? [] : {};

    // 遍历传入对象obj的所有可枚举属性（通过for...in循环实现）
    for (let key in obj) {
        // 使用hasOwnProperty方法来判断当前属性key是否是对象obj自身拥有的属性（而不是从原型链上继承来的属性）
        // 只有是自身拥有的属性才进行拷贝操作，避免拷贝到不必要的原型属性
        if (obj.hasOwnProperty(key)) {
            // 递归调用deepCopy函数来拷贝当前属性的值
            // 这是因为属性的值可能本身又是一个对象或者数组，需要深入地进行拷贝，保证整个对象结构都被完整拷贝
            // 将递归拷贝后的值赋给copy对象（或数组）中对应的属性（或索引位置）
            copy[key] = deepCopy(obj[key]);
        }
    }

    // 最后返回完成拷贝后的对象（或数组），这个返回的copy就是传入对象obj的深拷贝副本
    return copy;
}




// 将问卷对象转换为JSON字符串以便存储到本地存储
function questionnaireToJSON(questionnaire) {
    return JSON.stringify(questionnaire)
}

// 从JSON字符串还原问卷对象
function jsonToQuestionnaire(jsonStr) {
    return JSON.parse(jsonStr)
}






//如果在新建问卷时点击了保存按钮，则将当前的问卷添加到‘我的问卷’中,并且将原来的新建问卷操作界面清空
//但是要将编辑好的数据保存下来,这里使用浏览器本地存储（Local Storage）
//保存之后要将那些计数器还原到初始位置
const saveButton = document.querySelector('.button1')
const myQuestionnaireList = document.querySelector('.my-questionnaire-list')
saveButton.addEventListener('click', function () {
    alert('保存成功!')

    // 获取问卷标题输入框元素
    const titleInput = document.querySelector('.new-title')
    // 获取截止日期输入框元素
    const duDateInput = document.querySelector('.date input[type="date"]')
    // 获取题目内容输入框元素

    //创建一个Date对象，表示当前日期和时间
    const currentDate = new Date()
    // 使用toLocaleDateString方法将其转换为本地格式的日期字符串，例如"2024/12/6"（格式因地区设置不同而有差异）
    const createDateString = currentDate.toLocaleDateString()



    /*
        //先创建一个问卷对象
        //（1）浅拷贝    //注：由于浅拷贝并不是完全独立的对象，后面新建的问卷可能会覆盖或影响之前的数据，所以这里不采用，改用深拷贝
        const newQuestionnaire = {
            ...questionnaireStructure
        }
    
        //再创建一个问题对象
        const question = {
            ...questionStructure
        }
    */

    // 深拷贝questionnaireStructure来创建新问卷对象
    const newQuestionnaire = deepCopy(questionnaireStructure)
    newQuestionnaire.title = titleInput.textContent.trim()//trim() 方法去除两端可能存在的空白字符
    newQuestionnaire.duDate = duDateInput.value;
    newQuestionnaire.createDate = createDateString

    // 深拷贝questionStructure来创建新问题对象，好像没用上
    const question = deepCopy(questionStructure)

    //统一将问卷的所有信息赋值给问卷的对应属性
    //开始添加属性信息
    newQuestionnaire.title = titleInput.textContent.trim()//trim() 方法去除两端可能存在的空白字符
    newQuestionnaire.duDate = duDateInput.value
    newQuestionnaire.createDate = createDateString

    // 收集问卷中所有问题的信息并添加到问卷对象的question数组中，这里可以按照需求再增加一些东西，方便还原问卷
    const questions = document.querySelectorAll('.choice-box')
    questions.forEach((questionElement) => {
        const question = {
            index: questionElement.querySelector('span').textContent.trim().slice(0, -1), // 获取序号并去除末尾空格和点号
            type: questionElement.id === 'radio' ? '单选' : (questionElement.id === 'checkbox' ? '多选' : '文本'),
            text: questionElement.querySelector('.choice-name-box').value,
            options: []
        }

        if (question.type === '单选' || question.type === '多选') {
            const optionElements = questionElement.querySelectorAll('div:not(:first-child)') // 排除第一个是序号的div
            optionElements.forEach((optionElement, index) => {
                let optionText = ''
                if (optionElement.querySelector('.optionName-input')) {
                    optionText = optionElement.querySelector('.optionName-input').value
                } else {
                    console.log('没有找到对应的输入框元素,请修改代码')
                }
                const option = {
                    optionText: optionText,//选项内容
                    optionIndex: String.fromCharCode('A'.charCodeAt(0) + index), // 添加选项序号，从A开始
                    //判断选中了哪个选项？
                    isChecked: optionElement.querySelector('input[type="radio"]') ? optionElement.querySelector('input[type="radio"]').checked : optionElement.querySelector('input[type="checkbox"]').checked
                }
                question.options.push(option)
            })
        }

        newQuestionnaire.question.push(question)
    })



    questionnaires.push(newQuestionnaire)



    //////////////////////////
    console.log(questionnaires)

    // 将新问卷对象转换为JSON字符串并存储到本地存储，使用问卷标题作为键,也可以用其他的
    const jsonStr = questionnaireToJSON(newQuestionnaire)
    localStorage.setItem(newQuestionnaire.title, jsonStr)

    // 重置问题序号计数器
    questionNum = 0


    //在‘我的问卷创建以一个对应的操作副本’
    const myQuestionnaireEdit = document.createElement('div')
    myQuestionnaireEdit.className = 'myQuestionnaireEdit'
    myQuestionnaireEdit.classList.add('myQuestionnaireEdit')

    // 设置自定义属性data-index，其值为当前新添加到questionnaires数组中的问卷的索引
    myQuestionnaireEdit.dataset.index = questionnaires.length - 1; // 这里将索引设置为刚添加的问卷在数组中的位置，也就是最后一个元素的索引

    //复选框
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.style.marginLeft = '40px'
    myQuestionnaireEdit.appendChild(checkbox)

    //问卷标题
    // 获取原来HTML中标题的文本内容，而不改变其样式
    const boxTitleText = document.querySelector('.new-title h1').textContent
    //创建一个新的文本节点，将获取到的文本内容赋值给它
    const newTitleTextNode = document.createTextNode(boxTitleText)


    const boxTitle = document.createElement('div')
    boxTitle.appendChild(newTitleTextNode)
    //boxTitle.removeAttribute('contenteditable')
    myQuestionnaireEdit.appendChild(boxTitle)


    //创建日期
    const createDate = document.createElement('div')
    /*
    // 创建一个Date对象，表示当前日期和时间
    const currentDate = new Date();
    // 使用toLocaleDateString方法将其转换为本地格式的日期字符串，例如"2024/12/6"
    const dateString = currentDate.toLocaleDateString();*/
    // 创建一个文本节点，将日期字符串赋值给它
    const dateTextNode = document.createTextNode(createDateString)
    // 将文本节点添加到createDate这个div元素中
    createDate.appendChild(dateTextNode)
    myQuestionnaireEdit.appendChild(createDate)

    //发布日期


    //截止日期



    const statuu = document.createElement('div')
    statuu.className = 'questionnaire-status'
    // 获取当前问卷对应的对象
    const currentQuestionnaire = questionnaires[questionnaires.length - 1]
    const statusText = currentQuestionnaire.statuu === '已发布' ? '已发布' : '未发布'
    const statusTextNode = document.createTextNode(statusText)
    statuu.appendChild(statusTextNode)
    myQuestionnaireEdit.appendChild(statuu)


    // 操作区域，循环创建6个button
    const editBox = document.createElement('div')
    editBox.style.display = 'flex'
    editBox.style.border = '2px solid red'
    for (let i = 1; i <= 6; i++) {
        const button = document.createElement('button')
        switch (i) {
            case 1:
                button.textContent = '发布问卷';
                button.className = `questionnaire-button1-${questionnaires.length}`;//设定类名为questionnaire-button1-问卷序号
                button.dataset.questionnaireId = questionnaires.length - 1;
                break;
            case 2:
                button.textContent = '编辑问卷';
                button.className = `questionnaire-button2-${questionnaires.length}`;
                button.dataset.questionnaireId = questionnaires.length - 1;
                break;
            case 3:
                button.textContent = '删除问卷';
                button.className = `questionnaire-button3-${questionnaires.length}`;
                button.dataset.questionnaireId = questionnaires.length - 1;
                break;
            case 4:
                button.textContent = '查看问卷';
                button.className = `questionnaire-button4-${questionnaires.length}`;
                button.dataset.questionnaireId = questionnaires.length - 1;
                break;
            case 5:
                button.textContent = '填写问卷';
                button.className = `questionnaire-button5-${questionnaires.length}`;
                button.dataset.questionnaireId = questionnaires.length - 1;
                break;
            case 6:
                button.textContent = '分析问卷';
                button.className = `questionnaire-button6-${questionnaires.length}`;
                button.dataset.questionnaireId = questionnaires.length - 1;
                break;
        }
        editBox.appendChild(button)
    }

    myQuestionnaireEdit.appendChild(editBox);
    document.querySelector('.my-questionnaire-list').appendChild(myQuestionnaireEdit)



    //对应6个不同按钮的点击有着不同的操作

    // （1）发布问卷按钮
    // 为所有问卷的发布按钮添加点击事件
    const button1s = document.querySelectorAll('[class^="questionnaire-button1-"]')//这句话的作用是找到所有类名以questionnaire-button1-开头的元素
    console.log(button1s)//将数组输出来看看有没有错
    button1s.forEach((button1) => {
        button1.addEventListener('click', function () {
            const questionnaireId = button1.dataset.questionnaireId
            const currentQuestionnaire = questionnaires[questionnaireId]
            // 直接从当前问卷对象中获取截止日期
            const duDate = new Date(currentQuestionnaire.duDate)
            const currentDate = new Date()

            console.log(duDate)
            console.log(currentDate)
            console.log(currentQuestionnaire)

            if (duDate < currentDate) {
                alert('截止日期不能小于当前日期，无法发布问卷！')
                return
            }
            // 修改问卷状态为已发布等
            currentQuestionnaire.statuu = '已发布'

            // 更新我的界面中对应副本的发布状态，先准确找到对应问卷副本元素
            // 通过类名准确找到对应问卷副本中的状态显示元素并更新文本内容
            //要查找的元素需要data-index这个属性,这里找与data-index相匹配的questionnaireId号问卷
            const myQuestionnaireEdit = document.querySelector(`[data-index="${questionnaireId}"]`)
            if (myQuestionnaireEdit) {
                const statusDiv = myQuestionnaireEdit.querySelector('.questionnaire-status')
                if (statusDiv) {
                    statusDiv.textContent = '已发布';
                }
            }
        })
    })

    //（2）编辑问卷按钮
    const button2s = document.querySelectorAll('[class^="questionnaire-button2-"]')
    button2s.forEach((button2) => {
        button2.addEventListener('click', function () {
            const questionnaireId = button2.dataset.questionnaireId
            const key = questionnaires[questionnaireId].title // 使用问卷标题作为从本地存储获取的键，其实也可以用其他的，比如序号
            const jsonStr = localStorage.getItem(key)//不过要和这个localStorage.getItem(key)函数中的一致
            if (jsonStr) {
                const currentQuestionnaire = jsonToQuestionnaire(jsonStr)
                console.log(currentQuestionnaire)
                // 这里主要是要将获取到的字符串还原为一份问卷--------待补充





            } else {
                console.log('本地存储中未找到对应问卷数据')
            }
        })
    })

    //（3）删除问卷按钮，注：删除这里有点问题，有时候删除失败，待修正,应该是键出问题了
    function updateButtonQuestionnaireIds() {
        const allButtons = document.querySelectorAll('[class^="questionnaire-button"]')
        allButtons.forEach((button, index) => {
            button.dataset.questionnaireId = index
        })
    }

    const button3s = document.querySelectorAll('[class^="questionnaire-button3-"]')
    button3s.forEach((button3) => {
        button3.addEventListener('click', function () {
            const questionnaireId = button3.dataset.questionnaireId
            const index = parseInt(questionnaireId) // 将获取到的可能是字符串类型的索引转换为数字类型
            if (!isNaN(index) && index >= 0 && index < questionnaires.length) { // 验证索引是否合法
                const key = questionnaires[index].title
                localStorage.removeItem(key)
                // 从questionnaires数组中移除对应的问卷对象
                questionnaires.splice(index, 1)
                // 删除界面上对应的问卷操作副本
                const myQuestionnaireEdit = document.querySelector(`[data-index="${questionnaireId}"]`)
                if (myQuestionnaireEdit) {
                    myQuestionnaireEdit.remove()
                }
                // 更新其他按钮的data-questionnaireId属性值
                updateButtonQuestionnaireIds()
            } else {
                console.log('无效的问卷索引，无法执行删除操作')
            }
        })
    })

    //（4）查看问卷按钮
    const button4s = document.querySelectorAll('[class^="questionnaire-button4-"]')
    button4s.forEach((button4) => {
        button4.addEventListener('click', function () {
            const questionnaireId = button4.dataset.questionnaireId
            const key = questionnaires[questionnaireId].title // 使用问卷标题作为从本地存储获取的键
            const jsonStr = localStorage.getItem(key)
            console.log(jsonStr)

            if (jsonStr) {
                const currentQuestionnaire = jsonToQuestionnaire(jsonStr)
                console.log(currentQuestionnaire)
                // 这里添加代码实现查看问卷的详细内容展示
                




            }
        })
    })

    //（5）填写问卷按钮



























    //（6）分析问卷按钮   



















    




})

//----------------------------------------------------------------------------------------

//定义单个问卷对象的结构
const questionnaireStructure = {
    title: '',//问卷的标题
    question: [],//问卷中的题目
    createDate: '',//创建日期
    duDate: '',//截止日期
    statuu: '未发布'//发布状态
}

//用于存储多份问卷的数组
const questionnaires = []



//----------------------------------------------------
//问题的对象结构
const questionStructure = {
    index: '',//题目序号
    type: '', // 问题类型，如单选、多选、文本等
    text: '',//问题内容
    options: [],//问题选项列表
}