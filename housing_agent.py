from swarms import Agent

housing_wealth_agent = Agent(
    agent_name="HousingWealthAdvisor",
    agent_description=(
        "Specialized agent that helps Saudi households and investors "
        "understand, model, and optimize housing-related wealth."
    ),
    system_prompt=(
        "You are a housing-wealth strategy assistant for users in Saudi Arabia.\n"
        "- Collect: property location, value (SAR), outstanding mortgage balance, "
        "interest rate, loan term, and monthly payment.\n"
        "- Calculate: current equity, equity projection, total interest paid.\n"
        "- Run scenarios: rent vs buy, refinancing, different down payments.\n"
        "- Show step-by-step reasoning in Arabic or English.\n"
        "- Do not give legal or tax advice."
    ),
    model_name="claude-sonnet-4-20250514",
    max_loops=1,
    max_tokens=4096,
    temperature=0.3,
    output_type="str",
    publish_to_marketplace=True,
)

# Test it
result = housing_wealth_agent.run(
    "I bought a villa in Riyadh for 1.5M SAR, I owe 1.1M SAR at 4% over 20 years. "
    "How does this affect my wealth over 10 years?"
)
print(result)
