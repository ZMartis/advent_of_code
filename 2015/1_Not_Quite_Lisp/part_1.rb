input = File.open('input.txt').read

floor = 0

input.chars.each { |symbol| symbol == '(' ? floor += 1 : floor -= 1 }

print floor
