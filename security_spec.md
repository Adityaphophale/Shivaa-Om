# Security Specification for Shivaa Om Globe Trade

## 1. Data Invariants
- Products, Blogs, and Trade Activities are public for reading but strictly restricted to Admins for writing.
- Inquiries can be created by anyone (public) but can only be read/managed by Admins.
- Admins are defined in a separate `admins` collection by their UID.

## 2. Dirty Dozen Payloads (Rejection Targets)
1. **Unauthenticated Write**: `{ "name": "Hack" }` to `/products/steal` -> DENIED
2. **Missing Field (Product)**: `{ "name": "incomplete" }` to `/products/1` -> DENIED (missing category)
3. **Ghost Field (Product)**: `{ "name": "P", "category": "Agro", "extra": "evil" }` -> DENIED (strict keys)
4. **Invalid Type**: `{ "name": 123 }` -> DENIED
5. **PII Leak**: GET `/inquiries/someId` as a regular user -> DENIED
6. **Self-Promotion**: Create a document in `/admins/{myUid}` as a regular user -> DENIED
7. **Identity Spoofing (Inquiry)**: Create inquiry with `id` that doesn't match? No, inquiry doesn't have an owner field usually, but it shouldn't be modifiable once sent.
8. **Update immutable field**: Try to change `createdAt` on a product -> DENIED
9. **Large Payload**: 1MB string in `description` -> DENIED
10. **State Shortcut**: Change inquiry status from `New` to `Replied` without going through proper logic? (Actually status change is fine for admin).
11. **Orphaned Inquiry**: Create inquiry with a non-existent product interest? (Reference check).
12. **Malicious ID**: Create document with id `../../../etc/passwd` -> DENIED (isValidId check).

## 3. Test Runner (Conceptual)
`firestore.rules.test.ts` would verify these scenarios.
