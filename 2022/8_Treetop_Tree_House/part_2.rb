@input =
  File
    .open('input.txt')
    .read
    .split("\n")
    .map { |row| row.split('').map { |number| number.to_i } }

def check_direction(direction, x, y, number)
  visible_trees = 0
  checked_position = [x + direction[0], y + direction[1]]
  continue = true
  while checked_position[0] >= 0 && checked_position[1] >= 0 &&
          checked_position[0] < @input[0].length &&
          checked_position[1] < @input.length && continue
    visible_trees += 1
    if @input[checked_position[1]][checked_position[0]] >= number
      continue = false
    end
    checked_position[0] += direction[0]
    checked_position[1] += direction[1]
  end
  visible_trees
end

largest_scenic_score = 0

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

    scenic_score = up * down * left * right

    largest_scenic_score = scenic_score if scenic_score > largest_scenic_score
  end
end

print largest_scenic_score
