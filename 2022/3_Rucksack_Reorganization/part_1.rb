input =
  File
    .open('input.txt')
    .read
    .split("\n")
    .map { |string| string.chars.each_slice(string.length / 2).map(&:join) }

# ------------------------

dictionary = {}

for i in 0...26
  dictionary[i.times.reduce('a') { |a| a.next }] = i + 1
end
for i in 26...52
  dictionary[(i - 26).times.reduce('A') { |a| a.next }] = i + 1
end

intersections =
  input
    .map { |rucksack| rucksack[0].chars.intersection(rucksack[1].chars) }
    .flatten

print intersections.map { |letter| dictionary[letter] }.sum
