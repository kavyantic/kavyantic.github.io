import { Component, useEffect, useRef } from "react";

export default function Spinner() {
  const spinnerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (spinnerRef.current && wheelRef.current) {
      const spinnerWidth = spinnerRef.current.offsetWidth;
      const wheelWidth = wheelRef.current.offsetWidth;
      const wheelPosition = spinnerWidth / 2 - wheelWidth / 2;
    }
  }, []);

  return (
    <div className="spinner" ref={spinnerRef}>
      <div className="wheel" ref={wheelRef}></div>
      <div className="petal"></div>
      <div className="petal"></div>
      <div className="petal"></div>
    </div>
  );
}
