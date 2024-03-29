input =
  File
    .open('input.txt')
    .read
    .split("\n\n")
    .map { |bag| bag.split("\n").map { |line| line.to_i } }

bags_with_total_calories = input.map { |bag| bag.reduce(:+) }

print bags_with_total_calories.sort.reverse.first
