""" Create variables of different types and display them. """

def main():
    # String (str)
    instance_type = 't2.micro'
    message = "My instances are of type:"

    # Interger (int)
    num_of_instances = 5
    hours_running = 10

    print(f"{message} {instance_type}. I have {num_of_instances} of them and they have been running for {hours_running} hours.")

    # Boolean (bool)
    instances_running = True
    # print(f"Are my instances running? {instances_running}")
    # print(f"My variables is of type: {type(instances_running)}.")


    # Floating-point number (float)
    instances_cost_per_hour = 0.25 # USD
    print(f"The Price of running them per intance per hour is {instances_cost_per_hour} USD.")

if __name__ == '__main__':
    main()
 