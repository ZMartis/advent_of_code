input =
  File
    .open('input.txt')
    .read
    .split("\n\n")
    .map { |bag| bag.split("\n").map { |candy| candy.to_i } }

@sorted_bag_totals = input.map { |bag| bag.sum }.sort.reverse

def sumOfBags(number) =
  @sorted_bag_totals.each_slice(number).map { |section| section.sum }.first

print sumOfBags(3)
