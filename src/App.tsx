import "./App.css";
import { useEffect, useState } from "react";
function App() {
  interface T {
    label: string;
    value: string;
  }

  const [tokens, setTokens] = useState<Array<T>>([]);
  const [tokenInput, setTokenInput] = useState<string>("");
  const [duplicateToken, setDuplicateToken] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    const storedTokens = localStorage.getItem("tokens");
    if (storedTokens) {
      setTokens(JSON.parse(storedTokens));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tokens", JSON.stringify(tokens));
  }, [tokens]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      tokenInput.trim() != "" &&
      tokens.filter((item) => item.value === tokenInput.trim()).length === 0
    ) {
      setTokens((prevTokens) => [
        ...prevTokens,
        { label: tokenInput, value: tokenInput },
      ]);

      setTokenInput("");
      return;
    } else {
      setDuplicateToken(tokenInput.trim());
      setTimeout(() => {
        setDuplicateToken("");
      }, 1000);
    }
  };

  const handleRemoveToken = (label: string) => {
    setTokens((prevTokens) =>
      prevTokens.filter((item) => item.label !== label)
    );
  };

  const handleTokenCopy = () => {
    navigator.clipboard.writeText(
      tokens.map((token) => token.value).join(", ")
    );
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const handleClearTokens = () => {
    setTokens([]);
  };

  return (
    <div className=" bg-slate-700 min-w-dvw min-h-[100vh] items-center flex flex-col justify-center">
      <h2>Token Input</h2>
      <div className=" flex flex-col justify-between bg-amber-600 min-w-[50vw] max-w-3xl min-h-[60vh]">
        <div className=" flex p-1 m- flex-wrap items-center space-x-2">
          {tokens.map((token, index) => (
            <p
              key={index}
              className={` ${
                duplicateToken === token.label && "bg-red-500"
              } flexm-2 p-1 bg-blue-300 text-black rounded-sm`}
            >
              {token.value}
              <button
                onClick={() => handleRemoveToken(token.label)}
                className=" bg-blue-400 mx-1 p-1"
              >
                X
              </button>
            </p>
          ))}

          <input
            onKeyDown={handleInputKeyDown}
            onChange={(e) => setTokenInput(e.target.value)}
            value={tokenInput}
            className=" max-w-44 outline-0 bg-slate-400 p-1 px-2 h-fit text-black"
          ></input>
        </div>
        <div className=" flex place-self-end">
          <button
            onClick={handleClearTokens}
            className=" bg-slate-400  m-2 rounded-md p-1"
          >
            CLEAR
          </button>
          <button
            onClick={handleTokenCopy}
            className=" bg-slate-400  m-2 rounded-md p-1"
          >
            {isCopied ? "COPIED" : "COPY"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
