insert into atbl_Fantasy_SimpleCharacters
(
    character_id,
    class,
    race,
    created_at,
    special_ability,
    attributes,
    weapon,
    secondary_weapon
)
values
(
    '1a7b3f92-3f81-4cbf-bdf1-7d87c0f5a1a2',
    'Warrior',
    'High Elf',
    '2022-01-24T18:30:00Z',
    NULL,
    '{"health": 100, "attack": 20}',
    NULL,
    'Sword'
),(
    '3e91cbe7-9f35-4e3c-8bd8-6b3b2fabc456',
    'Mage',
    'Dwarf',
    '2022-02-15T12:45:00Z',
    'Fireball',
    '{"health": 80, "magic": 30}',
    NULL,
    'Staff'
),(
    '8d60ef41-5a9d-4c5a-8f2a-1d72f5d8e7e3',
    'Rogue',
    'Human',
    '2022-03-10T08:00:00Z',
    'Stealth',
    NULL,
    'Dagger',
    NULL
),(
    '2a4b1c99-8b71-4a9f-af93-9c18a6f8d9e0',
    'Cleric',
    'Orc',
    '2022-04-05T15:20:00Z',
    'Healing',
    '{"health": 120, "healing": 40}',
    NULL,
    'Mace'
)
