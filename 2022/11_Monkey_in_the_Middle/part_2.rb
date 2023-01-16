@input = File.open('test_input.txt').read.split("\n\n")

$monkeys = []

# TODO: need to find the lowest common denominator between all the "divisible by" numbers
# then keep track of the number of times it's divisible and the remainder.

class Monkey
  attr_accessor :id, :items, :number_inspected

  def initialize(
    id,
    items,
    number_inspected,
    test_number,
    true_monkey,
    false_monkey,
    operation_symbol,
    operation_number
  )
    @id = id
    @items = items
    @number_inspected = number_inspected
    @test_number = test_number
    @true_monkey = true_monkey
    @false_monkey = false_monkey
    @operation_symbol = operation_symbol
    @operation_number = operation_number
  end

  def operation
    if @operation_symbol == '+'
      if @operation_number == 'old'
        @items[0] = @items[0] + @items[0]
      else
        @items[0] = @items[0] + @operation_number
      end
    else
      if @operation_number == 'old'
        @items[0] = @items[0] * @items[0]
      else
        @items[0] = @items[0] * @operation_number
      end
    end
    @number_inspected += 1
  end

  def test
    if @items.first % @test_number == 0
      $monkeys.find { |monkey| monkey.id == @true_monkey }.items << @items.shift
    else
      $monkeys
        .find { |monkey| monkey.id == @false_monkey }
        .items << @items.shift
    end
  end
end

@input.each do |monkey_text|
  split_monkey = monkey_text.split("\n")
  id = split_monkey[0][split_monkey[0].length - 2]
  items =
    split_monkey[1].split(': ')[1]
      .split(', ')
      .map { |string_number| string_number.to_i }
  number_inspected = 0
  test_number = split_monkey[3].split(' ').last.to_i
  true_monkey = split_monkey[4].chars.last
  false_monkey = split_monkey[5].chars.last
  operation_symbol = split_monkey[2].split(' ').last(2)[0]
  operation_number =
    (
      if split_monkey[2].split(' ').last == 'old'
        'old'
      else
        split_monkey[2].split(' ').last.to_i
      end
    )
  $monkeys << Monkey.new(
    id,
    items,
    number_inspected,
    test_number,
    true_monkey,
    false_monkey,
    operation_symbol,
    operation_number,
  )
end

1000.times do |_index|
  $monkeys.each do |monkey|
    monkey.items.count.times do |_item|
      monkey.operation
      monkey.test
    end
  end
end

$monkeys.each { |monkey| puts monkey.number_inspected }

# inspected_numbers =
#   $monkeys.map { |monkey| monkey.number_inspected }.sort.last(2)

# puts inspected_numbers[0] * inspected_numbers[1]
