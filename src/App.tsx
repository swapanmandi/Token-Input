import "./App.css";
import { useEffect, useState } from "react";
import x from "./assets/x.svg";
import copy from "./assets/copy.svg";
import check from "./assets/check.svg";
import trash from "./assets/trash.svg";

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
    document.getElementById("token-input")?.focus();
  }, []);

  useEffect(() => {
    if (tokens.length > 0) {
      localStorage.setItem("tokens", JSON.stringify(tokens));
    }
  }, [tokens]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      tokenInput.trim() != "" &&
      tokens.filter(
        (item) => item.value.toLowerCase() === tokenInput.trim().toLowerCase()
      ).length === 0
    ) {
      setTokens((prevTokens) => [
        ...prevTokens,
        { label: tokenInput.trim(), value: tokenInput.trim() },
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
    localStorage.clear();
  };

  const handlePasteTokens = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");

    const pastedTokens = text.split(",").filter((token) => token.trim() != "");
    console.log(pastedTokens);
    const uniquePastedTokens = pastedTokens.filter(
      (token) => !tokens.some((storedToken) => storedToken.value === token)
    );

    const formatedPastedTokens = uniquePastedTokens.map((token) => ({
      label: token.trim(),
      value: token.trim(),
    }));

    setTokens((prevTokens) => [...prevTokens, ...formatedPastedTokens]);
    setTokenInput("");
  };

  return (
    <div className=" bg-slate-700 min-w-dvw min-h-[100vh] items-center flex flex-col justify-center">
      <h2 className=" text-2xl font-semibold text-amber-600 ">TOKEN INPUT</h2>
      <div className=" flex flex-col justify-between bg-amber-600 min-w-[50vw] max-w-3xl min-h-[60vh] rounded-md m-1">
        <div className=" flex p-2 flex-wrap items-center space-x-2">
          {tokens.map((token, index) => (
            <div
              key={index}
              className={` ${
                duplicateToken.toLowerCase() === token.label.toLowerCase() &&
                "bg-red-500"
              } h-8 flex items-center bg-blue-300 text-black rounded-md m-2 `}
            >
              <p className=" px-2">{token.value}</p>
              <button
                onClick={() => handleRemoveToken(token.label)}
                className={` ${
                  duplicateToken.toLowerCase() === token.label.toLowerCase() &&
                  "bg-red-500"
                } w-8 bg-blue-400 p-1 px-1 rounded-md hover:bg-red-400 cursor-pointer`}
              >
                <img src={x} />
              </button>
            </div>
          ))}

          <input
            id="token-input"
            placeholder="Enter Token"
            onPaste={handlePasteTokens}
            onKeyDown={handleInputKeyDown}
            onChange={(e) => setTokenInput(e.target.value)}
            value={tokenInput}
            maxLength={500}
            minLength={2}
            className=" max-w-44 outline-0 p-1 px-2 h-fit text-black"
          ></input>
        </div>
        <div className=" flex place-self-end p-2">
          <button
            onClick={handleClearTokens}
            className=" bg-slate-600  m-2 rounded-md p-1 cursor-pointer"
          >
            <img src={trash} />
          </button>
          <button
            onClick={handleTokenCopy}
            className=" bg-slate-600  m-2 rounded-md p-1 cursor-pointer"
          >
            <img src={isCopied ? check : copy} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
