(ns y2025.d03.solution
  (:require [clojure.java.io :as io]
            [clojure.string :as s]))

(def sample-file "src/y2025/d03/sample-input.txt")
(def file "src/y2025/d03/input.txt")

(defn read-data
  [file]
  (with-open [rdr (io/reader file)]
    (into [] (line-seq rdr))))

(defn ->number
  [s]
  (Integer/parseInt (str s)))

(defn ->numbers
  [numbers]
  (map ->number numbers))

(defn digits-after-first
  [[num number-str]]
  (let [index (s/index-of number-str num)]
    (subs number-str (inc index))))

(def sample-data (read-data sample-file))
(def data (read-data file))

(defn first-digits
  [the-data]
  (->> the-data
       (map #(drop-last %))                                 ;; Get numbers to choose from
       (map ->numbers)
       (map #(sort > %))
       (map first)
       (map str)))

(defn next-best-digit
  [first-digits the-data]
  (->> (interleave first-digits the-data)
       (partition 2)
       (map digits-after-first)
       (map ->numbers)
       (map #(sort > %))                                    ;; Use max instead
       (map first)
       (map str)
       ))

(def sample-total
  (let [first-digits (first-digits sample-data)
        next-best (next-best-digit first-digits sample-data)]
    (->> (interleave first-digits next-best)
         (partition 2)
         (map (partial apply str))
         (map ->number)
         (apply +)
         )
    ))

(def actual-total-p1
  (let [first-digits (first-digits data)
        next-best (next-best-digit first-digits data)]
    (->> (interleave first-digits next-best)
         (partition 2)
         (map (partial apply str))
         (map ->number)
         (apply +)
         )
    ))

;;;; end of part 1

(defn ->long
  [num]
  (Long/parseLong (str num)))

(defn next-best-digit
  [bank batteries-to-enable]
  (->> (drop-last (dec batteries-to-enable) bank)
       (map ->long)
       (apply max)
       str))

(defn remaining-bank
  [bank best-digit]
  (->> (s/index-of bank best-digit)
       inc
       (subs bank)))

(defn highest-joltage
  [batteries-to-enable bank]
  (loop [rem-bank bank
         batteries-left batteries-to-enable
         best-digits ""]
    (if (zero? batteries-left)
      best-digits
      (let [best-digit (next-best-digit rem-bank batteries-left)]
        (recur (remaining-bank rem-bank best-digit)
               (dec batteries-left)
               (str best-digits best-digit))))))

(def part-2-answer
  (->> data
       (map (partial highest-joltage 12))
       (map ->long)
       (apply +)))

