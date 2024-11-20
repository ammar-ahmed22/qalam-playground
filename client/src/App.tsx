import React from 'react';
import CodeEditor from "@uiw/react-codemirror"
import qalam from './utils/qalam';

const defaultCode = `
shai a = 1;
shai b = 2;

amal add(a, b) {
  radd a + b;
}

itha(haqq) {
  qul("its true")
} illa {
  qul("its false")
}
`

function App() {

  return (
    <div className="App">
      <CodeEditor 
        value={defaultCode}
        extensions={[qalam]}
        theme="dark"
      />
    </div>
  );
}

export default App;
