input =
  File
    .open('input.txt')
    .read
    .split("\n")
    .each_slice(3)
    .map { |strings| strings }

# ------------------------

dictionary = {}

for i in 0...26
  dictionary[i.times.reduce('a') { |a| a.next }] = i + 1
end
for i in 26...52
  dictionary[(i - 26).times.reduce('A') { |a| a.next }] = i + 1
end

print input
        .map { |group|
          group[0].chars.intersection(group[1].chars, group[2].chars)
        }
        .flatten
        .map { |letter| dictionary[letter] }
        .sum
