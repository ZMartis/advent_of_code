input =
  File
    .open('input.txt')
    .read
    .split("\n")
    .map do |line|
      string_ranges = line.split(',')
      string_ranges.map do |range|
        range_numbers = range.split('-').map { |string| string.to_i }
        { 'min' => range_numbers[0], 'max' => range_numbers[1] }
      end
    end

# iterate over every line
# check if min and max are both inside or outside of second range min and max
# if yes increment counter

counter = 0

for pair in input
  if (pair[0]['min'] <= pair[1]['min'] && pair[0]['max'] >= pair[1]['max']) ||
       (pair[0]['min'] >= pair[1]['min'] && pair[0]['max'] <= pair[1]['max'])
    counter += 1
  end
end

puts counter
