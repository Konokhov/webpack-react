import React from "react";
import {cn as bem} from '@bem-react/classname';

function App() {
  const cn = bem("app");

  return (
    <h1 className={cn()}>webpack react</h1>
  );
}

export default App;