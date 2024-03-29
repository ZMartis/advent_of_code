class Monkey
  attr_accessor :items, :number_inspected

  def initialize(
    items,
    number_inspected,
    test_number,
    true_monkey_id,
    false_monkey_id,
    operation
  )
    @items = items
    @number_inspected = number_inspected
    @test_number = test_number
    @true_monkey_id = true_monkey_id
    @false_monkey_id = false_monkey_id
    @operation = operation
  end

  def execute_operation
    @operation.call(@items)
    @number_inspected += 1
  end

  def test
    if @items[0] % @test_number == 0
      $monkeys[@true_monkey_id].items << @items.shift
    else
      $monkeys[@false_monkey_id].items << @items.shift
    end
  end
end

def initialize_monkeys
  @monkey_strings.each do |monkey_string|
    split_monkey = monkey_string.split("\n")
    items = split_monkey[1].split(": ")[1].split(", ").map{ |string_number| string_number.to_i }
    number_inspected = 0
    test_number = split_monkey[3].split(" ").last.to_i
    true_monkey_id = split_monkey[4].chars.last.to_i
    false_monkey_id = split_monkey[5].chars.last.to_i
    operation_symbol = split_monkey[2].split(" ").last(2)[0]
    operation_number = split_monkey[2].split(' ').last.to_i
    operation = if operation_symbol == '+'
                  if operation_number == 0
                    ->(items) { items[0] = ( items[0] + items[0]) / 3 }
                  else
                    ->(items) { items[0] = ( items[0] + operation_number ) / 3 }
                  end
                else
                  if operation_number == 0
                    ->(items) { items[0] = ( items[0] * items[0]) / 3 }
                  else
                    ->(items) { items[0] = ( items[0] * operation_number) / 3 }
                  end
                end

    $monkeys << Monkey.new(items, number_inspected, test_number, true_monkey_id, false_monkey_id, operation)
  end
end

# ---------------------------

start_time = Time.now()

@monkey_strings = File.open('input.txt').read.split("\n\n")
$monkeys = []
initialize_monkeys

20.times do |_index|
  $monkeys.each do |monkey|
    monkey.items.count.times do |_item|
      monkey.execute_operation
      monkey.test
    end
  end
end

inspected_numbers = $monkeys.map {|monkey| monkey.number_inspected }.sort.last(2)
end_time = Time.now()

puts inspected_numbers[0] * inspected_numbers[1]
# => 117640
puts end_time - start_time
