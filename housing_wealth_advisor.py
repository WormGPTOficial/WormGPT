import yaml
from swarms import Agent

with open("housing_wealth_advisor.yaml") as f:
    config = yaml.safe_load(f)["agents"][0]

housing_wealth_agent = Agent(
    agent_name=config["agent_name"],
    agent_description=config["agent_description"],
    system_prompt=config["system_prompt"],
    model_name=config["model_name"],
    max_loops=config["max_loops"],
    max_tokens=config["max_tokens"],
    temperature=config["temperature"],
    output_type=config["output_type"],
    publish_to_marketplace=config["publish_to_marketplace"],
)

# Smoke test
result = housing_wealth_agent.run(
    "I bought a villa in Riyadh for 1.5M SAR, I owe 1.1M SAR at 4% over 20 years. "
    "How does this affect my wealth over 10 years?"
)
print(result)
