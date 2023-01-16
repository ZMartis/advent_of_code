input = File.open('input.txt').read

floor = 0
basement_floor_index = nil

input.chars.each_with_index do |symbol, index|
  symbol == '(' ? floor += 1 : floor -= 1
  basement_floor_index = index + 1 if floor == -1 && basement_floor_index == nil
end

print basement_floor_index
