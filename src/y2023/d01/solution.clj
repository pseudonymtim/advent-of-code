(ns y2023.d01.solution
  (:require [clojure.java.io :as io]))

(def file "src/y2023/d01/input.txt")

(defn read-data
  [file]
  (with-open [rdr (io/reader file)]
    (into [] (line-seq rdr))))
