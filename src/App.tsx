import "./App.css";
import { useState } from "react";
function App() {
  interface T {
    label: string;
    value: string;
  }

  const [tokens, setTokens] = useState<Array<T>>([{ label: "", value: "" }]);
  const [tokenInput, setTokenInput] = useState<string>("");

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tokenInput.trim() != "") {
      setTokens((prevTokens) => [
        ...prevTokens,
        { label: tokenInput, value: tokenInput },
      ]);
      setTokenInput(""); // to clear input field after adding token
      return; // to avoid adding empty token when enter key is pressed
    }
  };

 

  return (
    <div className=" bg-slate-700 min-w-dvw min-h-[100vh] items-center flex flex-col justify-center">
      <h2>Token Input</h2>
      <div className=" bg-amber-600 min-w-[50vw] max-w-3xl min-h-[60vh]">
        <div className=" flex p-1 m- flex-wrap items-center">
          {tokens.map((token, index) => (
            <p
              key={index}
              className=" m-2 p-1 bg-blue-300 text-black rounded-sm"
            >
              {token.value}
             
            </p>
          ))}

          <input
            onKeyDown={handleInputKeyDown}
            onChange={(e) => setTokenInput(e.target.value)}
            value={tokenInput}
            className=" max-w-44 outline-0 bg-slate-400 p-1 px-2 h-fit text-black"
          ></input>
        </div>
      </div>
    </div>
  );
}

export default App;
