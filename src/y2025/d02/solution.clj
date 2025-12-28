(ns y2025.d02.solution
  (:require [clojure.java.io :as io]
            [clojure.string :as s]))

(def sample-file "src/y2025/d02/sample-input.txt")
(def file "src/y2025/d02/input.txt")

(defn read-data
  [file]
  (with-open [rdr (io/reader file)]
    (into [] (line-seq rdr))))

(def range-separator ",")
(def id-separator "-")

(def sample-data
  (first (read-data sample-file)))

(def data
  (first (read-data file)))

;; Part 1
(defn invalid-id-p1?
  [id]
  (let [[first-half second-half] (split-at (/ (count id) 2) id)]
    (= first-half second-half)))

;; Part 2
(defn repeated-parts?
  [coll parts]
  (let [length (count coll)
        items-per-partition (quot length parts)
        partitions (partition-all items-per-partition coll)]
    (apply = partitions)))

(defn invalid-id-p2?
  [id]
  (let [start 2
        end (count id)]
    (->> (range start (+ end 1))                            ; all possible partitions
         (map #(repeated-parts? id %))                      ; which have repeating parts
         (some true?)                                       ; any of them have repeating parts?
         )))

;; both parts

(->> (s/split data (re-pattern range-separator))
     (map #(s/split % (re-pattern id-separator)))
     (map #(list (Long/parseLong (first %))
                 (Long/parseLong (last %))))
     (map (fn [[start end]] (cons end (range start end))))
     flatten
     (map str)
     ;(filter invalid-id-p1?)
     (filter invalid-id-p2?)
     (map #(Long/parseLong %))
     (apply +)
     )
