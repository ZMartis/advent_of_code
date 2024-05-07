input = File.read("input.txt").split("\n")

# "A".."Z"[][]
piles =
  input
    .first(8)
    .map { |line| line.chars.drop(1).each_slice(4).map(&:first) }
    .transpose
    .map { |pile| pile.reject { |letter| letter.strip.empty? } }

# number[][]
directions =
  input
    .drop(10)
    .map { |line| line.split(" ").each_slice(2).map(&:last).map(&:to_i) }

directions.each.with_index do |direction, index|
  count = direction[0]
  from = direction[1] - 1
  to = direction[2] - 1

  piles[to].unshift(*piles[from].shift(count))
end

puts piles.map(&:first).join
# => RGLVRCQSB
