(ns y2022.d01.solution
  (:require [clojure.java.io :as io]))

(def file "src/y2022/d01/input.txt")
(def sample-file "src/y2022/d01/input_sample.txt")

(defn read-data
  [file]
  (with-open [rdr (io/reader file)]
    (into [] (line-seq rdr))))

(defn parse
  [calories-str]
  (if (empty? calories-str)
    nil
    (parse-long calories-str)))

(def totals
  (->> (read-data file)
       (map parse)
       (partition-by nil?)
       (remove #(nil? (first %)))
       (map #(apply + %))))

(def named-totals
  (seq (zipmap (range 1 (inc (count totals)))
               totals)))

(defn desc-comp
  [[n1 c1] [n2 c2]]
  (compare c2 c1))

(def desc-sorted-named-totals
  (sort desc-comp named-totals))

;; How many total Calories is that Elf carrying?
(def most-calories-being-carried
  (->> named-totals
       (sort desc-comp)
       first
       second))

;; How many Calories are those Elves carrying in total?
(def calories-carried-by-to-three-carriers)
(->> (take 3 desc-sorted-named-totals)
     (map second)
     (apply +))
