@input = File.open('input.txt').read.split("\n")

@register = 1

@cycle_number = 0

@total_signal_strengths = 0

def split_line(line)
  line.split(' ')[1].to_i
end

def calculate_signal_strength
  @total_signal_strengths += @register * @cycle_number
end

def cathode_ray_tube
  @input.each_with_index do |line, index|
    @cycle_number += 1

    calculate_signal_strength if 20 == @cycle_number % 40

    next if line == 'noop'

    @cycle_number += 1

    calculate_signal_strength if 20 == @cycle_number % 40

    @register += split_line(line)
  end

  @total_signal_strengths
end

puts cathode_ray_tube
