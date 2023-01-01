@input =
  File
    .open('input.txt')
    .read
    .split("\n")
    .map { |row| row.split('').map { |number| number.to_i } }

def check_direction(direction, x, y, number)
  is_visible = true
  checked_position = [x + direction[0], y + direction[1]]
  while checked_position[0] >= 0 && checked_position[1] >= 0 &&
          checked_position[0] < @input[0].length &&
          checked_position[1] < @input.length
    is_visible = false if @input[checked_position[1]][checked_position[0]] >=
      number
    checked_position[0] += direction[0]
    checked_position[1] += direction[1]
  end
  is_visible
end

counter = 0

# iterate through each row
# iterate through numbers
# check up, left, right, down to see if there is larger number in that direction
# if yes to any increment counter

@input.each_with_index do |row, row_index|
  row.each_with_index do |number, column_index|
    # check up
    up = check_direction([0, -1], column_index, row_index, number)
    # check down
    down = check_direction([0, 1], column_index, row_index, number)
    # check left
    left = check_direction([-1, 0], column_index, row_index, number)
    # check right
    right = check_direction([1, 0], column_index, row_index, number)

    counter += 1 if [up, down, left, right].any? { |boolean| boolean == true }
  end
end

print counter
