# Firestore Security Rules Documentation

## Overview

This document describes the comprehensive role-based access control (RBAC) security rules implemented for the Hestio Home Hub Firestore database.

## Security Philosophy

The security rules follow these core principles:

1. **Principle of Least Privilege**: Users can only access data they need for their role
2. **Data Isolation**: Users cannot access data from properties/leases they're not involved in
3. **Role-Based Access**: Different user roles have different permissions
4. **Ownership Protection**: Users cannot escalate privileges or change ownership without authorization
5. **Cloud Function Access**: Admin tokens allow Cloud Functions to perform system operations

## User Roles

The system supports 7 distinct user roles:

| Role | Description |
|------|-------------|
| `tenant` | Renters of properties |
| `owner` | Property owners who list properties |
| `agent` | Real estate agents managing properties for owners |
| `manager` | Property management companies |
| `company` | Condo/building management companies |
| `vendor` | Maintenance service providers |
| `government` | Regulatory oversight (future use) |

## Collection Security Rules

### Users Collection

**Read**: ✅ All authenticated users (needed for displaying names in conversations, etc.)

**Create**: ✅ Own document only
- Must include required fields: `email`, `displayName`, `role`
- User can set their initial role

**Update**: ✅ Own document only
- ⚠️ **Cannot change role** after creation (prevents privilege escalation)
- Can update other fields like `displayName`, `photoURL`, `phone`, etc.

**Delete**: ❌ Not allowed (must use admin functions)

### Properties Collection

**Read**: ✅ All authenticated users (for browsing listings)

**Create**: ✅ Owners, Agents, Managers only
- Must set `ownerId` to authenticated user's ID

**Update**: ✅ Property owner, agent, or manager
- ⚠️ **Cannot change `ownerId`** (prevents property theft)

**Delete**: ✅ Property owner only

### Leases Collection

**Read**: ✅ Tenant, Owner, or Agent listed in the lease only

**Create**: ✅ Owners, Agents, Managers only
- Must be either the owner or agent in the lease

**Update**: ✅ Tenant, Owner, or Agent listed in the lease
- Allows all parties to add signatures

**Delete**: ✅ Owner only

### Payments Collection

**Read**: ✅ Tenant, Owner, Agents, Managers
- Tenants see their own payments
- Owners see payments for their properties
- Agents/Managers see all

**Create**: ✅ Owners, Agents, Managers, Cloud Functions
- Cloud Functions use admin token for scheduled payments

**Update**: ✅ Tenant, Owner, Agents, Managers, Cloud Functions
- Allows Stripe webhooks to update payment status

**Delete**: ✅ Owner only

### Maintenance Collection

**Read**: ✅ Reporter, Assigned Vendor, Property Owner/Agent/Manager

**Create**: ✅ Tenants, Owners, Agents, Managers
- Must set `reportedBy` to authenticated user

**Update**: ✅ Reporter, Assigned Vendor, Owners, Agents, Managers

**Delete**: ✅ Owners, Managers only

### Conversations Collection

**Read**: ✅ Participants only
- Must be listed in `participants` array

**Create**: ✅ Any authenticated user
- Must include self in `participants`

**Update**: ✅ Participants only

**Delete**: ✅ Participants only

### Messages Collection

**Read**: ✅ Conversation participants only
- Checks parent conversation's participants

**Create**: ✅ Conversation participants only
- Must set `senderId` to authenticated user

**Update**: ✅ Sender or participants
- Allows marking messages as read

**Delete**: ✅ Sender only

### Notifications Collection

**Read**: ✅ Own notifications only

**Create**: ✅ Cloud Functions (admin token) or self

**Update**: ✅ Own notifications only (mark as read)

**Delete**: ✅ Own notifications only

### Documents Collection

**Read**: ✅ Document owner + parties related to the linked entity
- If related to property: property owner/agent/manager/tenant
- If related to lease: tenant/owner/agent

**Create**: ✅ Any authenticated user (for their own documents)
- Must set `ownerId` to authenticated user

**Update**: ✅ Document owner only

**Delete**: ✅ Document owner only

### Applications Collection

**Read**: ✅ Applicant, Property Owner/Agent/Manager

**Create**: ✅ Tenants only
- Must set `applicantId` to authenticated user

**Update**: ✅ Applicant (submit docs), Owners/Agents/Managers (review)

**Delete**: ✅ Applicant only (withdraw application)

### Vendors Collection

**Read**: ✅ All authenticated users (for vendor directory)

**Create**: ✅ Users with vendor role only
- Must set `userId` to authenticated user

**Update**: ✅ Vendor owner only

**Delete**: ✅ Vendor owner only

### Subscriptions Collection (Stripe)

**Read**: ✅ Own subscriptions only

**Create**: ✅ Cloud Functions only (admin token)

**Update**: ✅ Cloud Functions only (admin token)

**Delete**: ❌ Not allowed

## Helper Functions

### isAuthenticated()
Checks if user is logged in

### getUserRole()
Fetches the user's role from the users collection

### hasRole(role)
Checks if user has a specific role

### hasAnyRole(roles)
Checks if user has any of the specified roles

### isPropertyOwner(propertyData)
Checks if user is the property owner

### isPropertyAgent(propertyData)
Checks if user is the property's agent

### isPropertyManager(propertyData)
Checks if user is the property's manager

### isPropertyTenant(propertyData)
Checks if user is the current tenant

### hasPropertyAccess(propertyData)
Checks if user has any access to the property (owner/agent/manager/tenant)

## Security Improvements Over Previous Rules

| Issue | Previous Behavior | New Behavior |
|-------|-------------------|--------------|
| **Data Leakage** | Any authenticated user could read/write any document | Users can only access data they're authorized for |
| **Privilege Escalation** | Users could change their role | Role is immutable after creation |
| **Property Theft** | Anyone could change property ownership | Ownership cannot be changed via updates |
| **Privacy Violations** | Anyone could read private conversations | Only participants can access conversations |
| **Payment Fraud** | Anyone could create/modify payments | Only authorized parties can manage payments |
| **Application Privacy** | Anyone could read tenant applications | Only applicant and property stakeholders can access |

## Testing Security Rules

### Using Firebase Emulator

```bash
# Start Firestore emulator
firebase emulators:start --only firestore

# Run security rules unit tests (if you create them)
npm run test:security
```

### Manual Testing Scenarios

1. **Test Property Access**:
   - Login as Tenant A
   - Try to read Property owned by Owner B (should fail)
   - Try to update Property owned by Owner B (should fail)

2. **Test Role Escalation**:
   - Login as Tenant
   - Try to change `role` to `owner` (should fail)

3. **Test Conversation Privacy**:
   - Login as User A
   - Try to read conversation between User B and User C (should fail)

4. **Test Payment Access**:
   - Login as Tenant A
   - Try to read payments for Tenant B (should fail)

5. **Test Ownership Protection**:
   - Login as Owner A
   - Create a property
   - Try to change `ownerId` to Owner B (should fail)

## Deployment

### Deploy to Production

```bash
# Deploy only Firestore rules
firebase deploy --only firestore:rules

# Deploy with indexes
firebase deploy --only firestore
```

### Verify Deployment

```bash
# Check deployed rules
firebase firestore:indexes

# Test with Firebase Console
# Go to Firestore > Rules > Playground
```

## Known Limitations

1. **Performance**: Complex nested `get()` calls in rules may impact latency
   - Consider denormalizing data to reduce `get()` calls
   - Example: Store `participantIds` in messages instead of fetching conversation

2. **Cloud Function Access**: Requires admin token
   - Cloud Functions must be authenticated with admin SDK
   - Custom tokens need `admin: true` claim

3. **Batch Operations**: Rules evaluated per document
   - Batch writes must pass rules for each document individually

## Future Enhancements

1. **Rate Limiting**: Add rules to prevent spam (e.g., max messages per minute)
2. **Data Validation**: Add field-level validation (e.g., email format, price ranges)
3. **Audit Logging**: Log security rule violations
4. **Performance Optimization**: Reduce `get()` calls with denormalization
5. **Government Role**: Implement permissions for regulatory oversight

## Support

For questions or issues with security rules:
- Review this documentation
- Check Firebase security rules documentation: https://firebase.google.com/docs/firestore/security/get-started
- Test with Firebase Emulator before deploying to production
- Use Firebase Console Rules Playground for debugging

## Changelog

### 2026-01-06 - Initial Implementation
- Implemented comprehensive role-based access control for all collections
- Added helper functions for role and ownership checks
- Protected against privilege escalation and data theft
- Documented all collection security rules
