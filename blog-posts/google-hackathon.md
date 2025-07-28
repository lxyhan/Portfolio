---
title: "REVO: Teaching AI to Spot Return Fraud at Google HQ"
description: "How two months of building led to presenting our e-commerce fraud detection system to judges at Google Toronto - and somehow winning first place."
date: "2025-3-25"
image: "/hack-the-future.png"
---

## Presenting at Google (No Big Deal)

There's something uniquely nerve-wracking about pitching your AI fraud detection system to a panel of industry experts while sitting in Google's Toronto headquarters. After two months of building REVO with teammates James, Nina, Sarah, and Jing Yu, we found ourselves in that exact scenario at Hack the Future - explaining how we taught computers to spot when someone has definitely worn that "never used" dress to multiple events.

The surreal part wasn't just the Google office setting (though those legendary snack bars lived up to the hype). It was watching judges nod along as we demonstrated our system catching return fraud patterns that human reviewers typically miss. Apparently, AI-powered retail forensics is more compelling than we'd expected.

## The $166 Billion Problem

Here's the thing about e-commerce returns: for every $1 billion in sales, retailers lose $166 million to fraud and processing costs. Small brands like Toronto's Kotn and Peace Collective get hit especially hard - they lack enterprise-level fraud detection but face proportionally higher losses from "wardrobing" customers who buy, wear, and return items after events.

Our solution, REVO, approaches this like a very patient store manager who never gets tired of examining suspicious returns. Using Google's Gemini-2.0-Flash model, we built computer vision analysis that spots subtle wear patterns while maintaining low false positive rates. Because nobody wants their fraud detection flagging legitimate customers.

> The most sophisticated fraud detection is useless if legitimate customers can't tell the difference between security and harassment.

## Building Something That Actually Works

The technical architecture proved fascinating to develop over two months. We combined Next.js frontend with Python/FastAPI backend, using Firebase for real-time data sync. The real challenge was teaching AI to make nuanced decisions about textile wear patterns - distinguishing between "tried on at home" and "definitely worn to three weddings."

Our custom rule engine lets retailers create flexible policies while automatically routing returns to optimal channels: restocking pristine items, directing slightly worn pieces to resale platforms, and sending damaged goods to recycling. It's retail triage, powered by machine learning.

The breakthrough came when our pilot tests showed 76% reduction in wardrobing losses with false positive rates low enough to maintain customer satisfaction. Suddenly, we had something worth presenting to Google.

## The Panel Experience

Standing in front of judges like Hoda Abokhadra, Jason Yang, and Cindy Zhong at Google HQ felt like the culmination of months spent debugging computer vision models and arguing about fraud detection thresholds. The questions were sharp, the feedback was constructive, and somehow our approach to AI-powered retail forensics resonated.

Winning first place felt surreal, but the real validation came from industry experts confirming we'd identified genuine pain points. Building fraud detection that protects businesses without punishing customers requires balancing competing priorities - something our two-month development cycle allowed us to refine properly.

## What We Actually Learned

This project reinforced that effective AI solves real business problems rather than theoretical ones. Small retailers don't need enterprise complexity; they need powerful tools within their existing workflows. The most interesting technical challenges often emerge from understanding genuine user constraints.

Plus, there's something deeply satisfying about building systems that catch digital shoplifters while keeping honest customers happy. It's applied computer science with immediate, measurable impact - exactly the kind of problem worth spending two months solving.

---

*Sometimes the best projects start with recognizing that if something seems obviously broken, there's probably a technical solution waiting to be built. REVO proved that with sufficient development time and the right team, you can create AI systems that solve genuinely useful problems.*

*Presenting at Google was just the bonus.*