lines = File.read('input.txt').split("\n")

start_time = Time.now

def number(line, cursor, iterator)
  loop do
    char = line[cursor]
    return char if (1..9).include?(char.to_i)

    cursor += iterator
  end
end

numbers_for_lines =
  lines.map do |line|
    "#{number(line, 0, 1)}#{number(line, line.length - 1, -1)}".to_i
  end

end_time = Time.now

puts numbers_for_lines.sum
# => 54450

puts end_time - start_time
