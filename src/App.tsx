import { useState, useMemo } from "react";
import clsx from "clsx";
import styles from "./App.module.css";

function App() {
  const [code, setCode] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("#fafafa");

  const encodedCode = useMemo(() => {
    return encodeURIComponent(code.replace(/\r?\n/g, ""));
  }, [code]);

  const outputCode = useMemo(() => {
    return encodedCode.length > 0
      ? `background-image: url('data:image/svg+xml;charset=utf8,${encodedCode}');`
      : "";
  }, [encodedCode]);

  // クリップボードにコピーして保存
  const saveToClipboard = () => {
    if (outputCode) {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(outputCode)
          .then(() => alert("クリップボードにコピーしました"));
      }
    }
  };

  return (
    <div className={clsx(styles.App)} style={{ backgroundColor: bgColor }}>
      <div className={styles.container}>
        <div className={styles.input}>
          <textarea
            name="inputCode"
            id="inputCode"
            className={styles.textarea}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            cols={30}
            rows={30}
          ></textarea>
        </div>
        <div className={styles.output} onClick={saveToClipboard}>
          {outputCode}
        </div>
      </div>
      <div
        className={styles.preview}
        style={{
          backgroundImage: `url('data:image/svg+xml;charset=utf8,${encodedCode}')`,
        }}
      ></div>
      <div>
        <input
          type="color"
          value={bgColor}
          onChange={(event) => setBgColor(event.target.value)}
        />
      </div>
    </div>
  );
}

export default App;
