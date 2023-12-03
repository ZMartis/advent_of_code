lines = File.read('input.txt').split("\n")

@rows = lines.map { |line| line.chars }

@number_chars = [*('0'..'9')]
non_symbol_chars = @number_chars + ['.']

@min_row_index = 0
@max_row_index = @rows.count - 1
@min_col_index = 0
@max_col_index = @rows.first.count

@check_indexes = [-1, 0, 1]

def number_indexes_around_symbol(symbol_row_index, symbol_col_index)
  number_indexes = []

  rows_to_check = @check_indexes.map { |number| number + symbol_row_index }
  if symbol_row_index == @min_row_index
    rows_to_check.shift
  elsif symbol_row_index == @max_row_index
    rows_to_check.pop
  end

  cols_to_check = @check_indexes.map { |number| number + symbol_col_index }
  if symbol_col_index == @min_col_index
    cols_to_check.shift
  elsif symbol_col_index == @max_col_index
    cols_to_check.pop
  end

  rows_to_check.each do |row|
    cols_to_check.each do |col|
      number_indexes << [row, col] if @number_chars.include?(@rows[row][col])
    end
  end

  number_indexes
end

def full_number_from_index(row_index, col_index)
  full_number = [@rows[row_index][col_index]]

  cursor_index = col_index

  while @number_chars.include?(full_number.first)
    cursor_index += -1
    full_number.unshift(@rows[row_index][cursor_index])
  end

  cursor_index = col_index

  while @number_chars.include?(full_number.last)
    cursor_index += 1
    full_number.append(@rows[row_index][cursor_index])
  end

  full_number.shift
  full_number.pop

  full_number.join.to_i
end

counts_per_symbol = []

@rows.each.with_index do |row, row_index|
  row.each.with_index do |char, col_index|
    next if non_symbol_chars.include?(char)

    indexes_to_check = number_indexes_around_symbol(row_index, col_index)

    set_of_numbers_around_symbol = Set.new

    indexes_to_check.each do |index|
      set_of_numbers_around_symbol << full_number_from_index(index[0], index[1])
    end

    counts_per_symbol << set_of_numbers_around_symbol.sum
  end
end

puts counts_per_symbol.sum
# => 557705
