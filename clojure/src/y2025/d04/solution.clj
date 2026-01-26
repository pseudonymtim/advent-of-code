(ns y2025.d04.solution
  (:require [clojure.java.io :as io]
            [clojure.string :as s]))

(def sample-file "src/y2025/d03/sample-input.txt")
(def file "src/y2025/d03/input.txt")

(defn read-data
  [file]
  (with-open [rdr (io/reader file)]
    (into [] (line-seq rdr))))



;..@@.@@@@.
;@@@.@.@.@@
;@@@@@.@.@@
;@.@@@@..@.
;@@.@@@@.@@
;.@@@@@@@.@
;.@.@.@.@@@
;@.@@@.@@@@
;.@@@@@@@@.
;@.@.@@@.@.

;; add . to each side, limit indexes

(defn up-left-reachable?
  [])

(defn reachable?
  [vertical-index horizontal-index rows]

  )