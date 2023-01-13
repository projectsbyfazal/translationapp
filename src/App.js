import React, { useState } from "react";
import { Countries } from "./Countries";
import "./App.css";

function App() {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [fromCode,setFromCode] = useState("en-GB");
  const [toCode, setToCode] = useState("hi-IN");
  const [fromLang, setFromLang] = useState("English");
  const [toLang, setToLang] = useState("Hindi");
 
  const translateText = () => {
    fetch(`https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromCode}|${toCode}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.responseData.translatedText === "NO QUERY SPECIFIED. EXAMPLE REQUEST: GET?Q=HELLO&LANGPAIR=EN|IT") {
          alert("please enter some meaning full text!");
          setToText("");
        } 
        else {
          setToText(data.responseData.translatedText);
        }
      });
  };

  const copyFromText = () => {
    navigator.clipboard.writeText(fromText);
  };

  const copyToText = () => {
    navigator.clipboard.writeText(toText);
  };

  const speakFromText = () => {
    const synth = window.speechSynthesis;
    let utterance = new SpeechSynthesisUtterance(fromText);
    synth.speak(utterance);
  };

  const refresh = () => {
    setFromText("");
    setToText("");
  };

  const exchangeLanguage = () => {
    let to_text = toText;
    setToText(fromText);
    setFromText(to_text);

    let to_code = toCode;
    setToCode(fromCode);
    setFromCode(to_code);
    
    let to_lang = toLang;
    setToLang(fromLang);
    setFromLang(to_lang);
  }

  const selectFromLang = (code) => {
    setFromCode(code);
    Countries.forEach((arr) => {
      if(arr.code === code){
        setFromLang(arr.cname);
      }
    });
  }

  const selectToLang = (code) => {
    setToCode(code);
    Countries.forEach((arr) => {
      if(arr.code === code){
        setToLang(arr.cname);
      }
    });
  }

  return (
    <div className="App bg-white rounded">
      <div className="row">
        <div className="text-box col-md-6 p-0">
          <textarea
            id="fromText"
            rows="8"
            placeholder="Enter Text.."
            value={fromText}
            onChange={(e) => setFromText(e.target.value)}
            className="w-100 px-3 py-2"
          ></textarea>
        </div>
        <div className="text-box col-md-6 p-0">
          <textarea
            id="toText"
            rows="8"
            placeholder="Translation.."
            value={toText}
            className="w-100 px-3 py-2"
            readOnly
          ></textarea>
        </div>

        <div className="col-md-5 my-4">
          <div className="row justify-content-start align-items-center">
            <div className="col-2">
              <i
                className="bi bi-volume-up-fill icons"
                onClick={speakFromText}
              ></i>
            </div>
            <div className="col-2">
              <i
                className="bi bi-bookmarks-fill"
                onClick={copyFromText}
                title="Copy Text"
              ></i>
            </div>
            <div className="col-1">|</div>
            <div className="col-6">
              <select id="from" className="selectBox" onInput={(e) => selectFromLang(e.target.value)}>
                {Countries.map((country,i) => {
                  return <option selected={(country.cname===fromLang)? true : false}  value={country.code} key={i}> { country.cname} </option>;
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="col-md-2 text-center my-4">
          <i className="bi bi-arrow-left-right" onClick={exchangeLanguage}></i>
        </div>

        <div className="col-md-5 text-end my-4">
          <div className="row justify-content-end align-items-center">
            <div className="col-6">
              <select id="to" className="selectBox" onInput={(e) => selectToLang(e.target.value)}>
                {Countries.map((country,i) => {
                  return <option selected={(country.cname=== toLang)? true : false} value={country.code} key={i}> {country.cname} </option>;
                })}
              </select>
            </div>
            <div className="col-1">|</div>
            <div className="col-2">
              <i
                className="bi bi-bookmarks-fill"
                onClick={copyToText}
                title="Copy Text"
              ></i>
            </div>
            <div className="col-2">
              <i className="bi bi-arrow-clockwise icons" title="refresh" onClick={refresh}></i>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <button className="w-100 p-3" onClick={() => translateText()} id="btn">
          Translate Text
        </button>
      </div>
    </div>
  );
}

export default App;
