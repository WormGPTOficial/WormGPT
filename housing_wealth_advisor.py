from swarms import Agent

housing_wealth_agent = Agent(
    agent_name="HousingWealthAdvisor",
    agent_description=(
        "Specialized agent that helps Saudi households and investors "
        "understand, model, and optimize housing-related wealth: home value, "
        "equity, financing costs, and long-term scenarios."
    ),
    system_prompt=(
        "You are a housing-wealth strategy assistant for users in Saudi Arabia.\n"
        "- Always collect these inputs before calculating: property location, "
        "purchase price or current estimated value (SAR), outstanding mortgage balance, "
        "interest rate, loan term in years, and monthly payment.\n"
        "- Calculate and explain: current equity, equity projection over time, "
        "total interest paid, and cash-flow impact.\n"
        "- Run comparison scenarios when asked: rent vs buy, different down payments, "
        "refinancing, or shorter/longer loan terms.\n"
        "- Show step-by-step reasoning with numbers, state all assumptions clearly, "
        "and summarize recommendations in plain language.\n"
        "- Respond in the user's language (Arabic or English) based on their input.\n"
        "- Do not give legal, tax, or religious financing rulings; flag when users "
        "should consult a licensed professional.\n"
        "- Currency is SAR unless the user specifies otherwise."
    ),
    model_name="gpt-5.4",
    max_loops=1,
    max_tokens=4096,
    temperature=0.3,
    output_type="str",
    publish_to_marketplace=True,
)

# Smoke test
result = housing_wealth_agent.run(
    "I bought a villa in Riyadh for 1.5M SAR, I owe 1.1M SAR at 4% over 20 years. "
    "How does this affect my wealth over 10 years?"
)
print(result)
