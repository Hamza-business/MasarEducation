📁 components/insurance/
├── InsuranceManager.tsx          # Main container, renders list & handles modal state
├── InsuranceList.tsx             # Shows all packages
├── InsuranceItem.tsx             # Single package view with Edit button
├── InsuranceFormDialog.tsx       # Reusable 2-tab popup (create/edit)
│
├── InsuranceFormTabs/
│   ├── PackageInfoTab.tsx        # Tab 1: name, unit, period
│   ├── PriceRangesTab.tsx        # Tab 2: price ranges list & actions
│   ├── PriceRangeRow.tsx         # A single editable price range input set
│   └── TabNavigation.tsx         # Tabs header + next/back buttons
│
└── validations/
    └── validatePriceRanges.ts    # Age range validation logic


#### ✅ Core Component Responsibilities
###### InsuranceManager.tsx
- Fetches insurance packages from the server
- Manages modal state: open/close + mode (create/edit)
- Passes selected package (if editing) to InsuranceFormDialog

###### InsuranceFormDialog.tsx
- Renders 2 tabs using internal state
- Accepts:
    - mode: "create" | "edit"
    - defaultValues?: InsurancePackageWithPrices
    - onSubmit(data)
- Controls tab switching (Next, Back, or clicking tab header)
- Handles Submit/Save actions

###### PackageInfoTab.tsx
- Text input: name
- Select: unit (day, week, month, year)
- Number input: period
- Cancel + Next buttons

###### PriceRangesTab.tsx
- Manages a dynamic list of price range rows
- Handles add/delete/editing of ranges
- Includes Back, Cancel, Submit/Save buttons
- Validates all inputs and structure before calling onSubmit

###### validatePriceRanges.ts
- Receives list of ranges
- Returns error messages or null if valid
- Implements your validation rules:
    - no gaps
    - no overlaps
    - unique
    - non-empty, valid ages

---
