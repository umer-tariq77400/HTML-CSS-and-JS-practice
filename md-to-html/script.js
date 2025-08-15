marked.setOptions({ breaks: true });

const clearButton = document.querySelector('.clear');
const runButton = document.querySelector('.run');
const input = document.querySelector('.input');
const output = document.querySelector('.output');

runButton.onclick = () => {
    let markdown = input.value;
    console.log(markdown.includes('\n')); // Check if the input contains newlines

    // If the textarea contains literal backslash-n sequences (for example when
    // content was pasted from JSON or shown as an escaped string), convert them
    // to real newlines so the markdown parser can interpret them.
    // Replace escaped CRLF first, then escaped LF, then normalize any real CRLF.
    markdown = markdown.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n');
    markdown = markdown.replace(/\r\n/g, '\n');

    output.innerHTML = marked.parse(markdown);
}

clearButton.onclick = () => {
    input.value = '';
    output.innerHTML = '';
}

// Function to get the demo markdown file
function demoDisplay(filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(text => {
            input.value = text;
            runButton.onclick();
        });
}

// Displaying the demo
demos = document.querySelectorAll('.demo');
demos.forEach(demo => {
    demo.onclick = () => {
        demoDisplay(`sample-markdowns/${demo.innerHTML.trim()}.md`);
    }
});


fetch('./README.md')
    .then(response => response.text())
    .then(text => {
        let readme = document.querySelector('.readme');
        readme.innerHTML = marked.parse(text);
    });