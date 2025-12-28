(ns y2025.d01.solution
  (:require [clojure.java.io :as io]
            [clojure.string :as s]))

(def sample-file "src/y2025/d01/sample-input.txt")
(def file "src/y2025/d01/input.txt")

(def dial-start 50)

(defn read-data
  [file]
  (with-open [rdr (io/reader file)]
    (into [] (line-seq rdr))))

(def sample-instructions (read-data sample-file))
(def instructions (read-data file))

;; Part 1

(defn ->numbers
  [instructions]
  (->> instructions
       (map #(s/replace % \R \+))
       (map #(s/replace % \L \-))
       (map #(Long/parseLong %))))

(defn count-zero-positions
  [instructions]
  (reduce
    (fn [{:keys [position zeros]} nextval]
      (let [next-position (+ position nextval)]
        {:position next-position
         :zeros    (if (= 0 (mod position 100))
                     (inc zeros)
                     zeros)}
        ))
    {:position dial-start
     :zeros    0}
    (->numbers instructions)))

;; Part 2

(defn super-range
  [start end]
  (let [minimum (min start end)
        maximum (max start end)]
    (->> (range minimum maximum)
         rest
         (cons end))))

(defn count-zero-passes
  [instructions]
  (reduce
    (fn [{:keys [position zeros]} nextval]
      (let [next-position (+ position nextval)
            interim-positions (super-range position next-position)
            passes-zero (count (filter #(= 0 (mod % 100)) interim-positions))]
        {:position next-position
         :zeros    (+ zeros passes-zero)}))
    {:position dial-start
     :zeros    0}
    (->numbers instructions)))


