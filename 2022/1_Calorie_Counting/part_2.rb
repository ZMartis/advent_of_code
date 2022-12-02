input =
  File
    .open('input.txt')
    .read
    .split("\n\n")
    .map { |bag| bag.split("\n").map { |candy| candy.to_i } }

@sorted_bag_totals =
  input.map { |bag| bag.reduce(0) { |sum, number| sum + number } }.sort.reverse

def sumOfBags(number)
  sum_of_number_of_bags = 0
  number.times { |i| sum_of_number_of_bags += @sorted_bag_totals[i] }
  return sum_of_number_of_bags
end

print sumOfBags(3)
