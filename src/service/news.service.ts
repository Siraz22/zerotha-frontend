import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
    providedIn: 'root',
})
export class NewsService {
    private endpoint = 'wss://stream.data.alpaca.markets/v1beta1/news';
    private wsSubject: WebSocketSubject<any>;
    private newsSubject = new Subject<any>();

    constructor() {}

    public connect(): void {
        this.wsSubject = webSocket(this.endpoint);

        this.wsSubject.next({ action: 'auth', key: 'PK1O4HNXXOX7D8V5PPQI', secret: 'G8knEQ4rc7KTNqEFzGuaiZ8oYwrS8uImD5LQ8aJn' });

        this.wsSubject.next({
            action: 'subscribe',
            news: ['*'],
        });

        this.wsSubject.subscribe(
            (data) => {
                console.log(data);
                this.newsSubject.next({
                    T: 'n',
                    id: 39975349,
                    headline:
                        'Elon Musk&#39;s Transgender Daughter, Vivian Wilson, Speaks Out About Father&#39;s Absence And Cruelty: &#39;He&#39;s Very Quick To Anger. He Is Indifferent And Self-Centered&#39;',
                    summary: ' ',
                    author: 'Shivdeep Dhaliwal',
                    created_at: '2024-07-26T01:40:08Z',
                    updated_at: '2024-07-26T02:15:40Z',
                    url: 'https://www.benzinga.com/24/07/39975349/elon-musks-transgender-daughter-vivian-wilson-speaks-out-about-fathers-absence-and-cruelty-hes-very',
                    content:
                        '<p><strong>Vivian Jenna Wilson</strong>, the transgender daughter of <strong>Tesla</strong> CEO <strong>Elon Musk</strong>, has broken her silence about her father&#8217;s harsh and unsupportive behavior.</p>\n\n\n\n<p><strong>What Happened</strong>: Wilson, 20, reacted to Musk&#8217;s remarks about her transgender identity, made earlier this week. Musk had claimed in a digital interview that he had been &#8220;duped&#8221; into approving trans-related medical procedures for Wilson when she was 16, a statement Wilson strongly refutes, <a href="https://www.nbcnews.com/tech/tech-news/elon-musk-transgender-daughter-vivian-wilson-interview-rcna163665">reported</a> NBC News.</p>\n\n\n\n<p>&#8220;I think he thought I wouldn\'t speak up and I would just let this slide, unopposed," Wilson stated. She portrayed Musk as a neglectful father who was harsh towards her for being queer and feminine.</p>\n\n\n\n<p>Wilson also disclosed that Musk would coerce her to present more masculine, including urging her to lower her voice from a young age. "He was distant," she expressed. "He\'s very quick to anger. He is indifferent and self-centered."</p>\n\n\n\n<p>Wilson, who is currently a college student, has mostly remained out of the public spotlight. However, she did garner attention in 2022 when she petitioned the court to change her name and disowned her father. "I no longer live with or wish to be associated with my biological father in any way, shape or form," she declared in the court document.</p>\n\n\n\n<p>She also responded to Musk\'s recent comments in a series of posts on the social media app Threads. "He doesn\'t know what I was like as a child because he simply wasn\'t there," she penned. "And during the little time that he was, I was relentlessly bullied for my femininity and queerness."</p>\n\n\n\n<p>Wilson mentioned an incident from her fourth grade where she went on a road trip with her father and he &#8220;he was constantly yelling at me viciously because my voice was too high.&#8221;</p>\n\n\n\n<p>Wilson informed NBC News that she had contemplated speaking out about Musk\'s conduct as a parent and as an individual for years, but that she could no longer stay silent following his comments on Monday.</p>\n\n\n\n<p>Benzinga has contacted Musk for a response through Tesla, and any statements received will be included as they become available</p>\n\n\n\n<p><strong>See Also: <a href="https://www.benzinga.com/news/24/07/39925959/kim-jong-un-rejects-donald-trumps-friendship-claims-north-korea-says-we-do-not-care-expresses-nuclea?itm_source=parsely-api" target="_blank" rel="noreferrer noopener">Kim Jong Un Rejects Donald Trump&#8217;s Friendship Claims? North Korea Says &#8216;We Do Not Care,&#8217; Expresses Nuclear Readiness Amid Rising Tension With US</a></strong></p>\n\n\n\n<p><strong>Why It Matters</strong>: This public revelation follows a series of events that have unfolded over the past two years. In June 2022, Musk&#8217;s ex-wife, <strong>Justine Wilson</strong>, <a href="https://www.benzinga.com/news/22/06/27801710/elon-musks-ex-wife-speaks-out-on-daughters-name-change-heres-what-she-said">publicly supported</a> their child&#8217;s decision to change their name from Xavier Musk to Vivian Jenna Wilson. Vivian received court approval to legally <a href="https://www.benzinga.com/news/22/06/27839370/elon-transgender-daughter-legal-approval">change her name</a> and gender.</p>\n\n\n\n<p>In July, Musk expressed his disapproval of his child&#8217;s transition during an interview, claiming he had been &#8220;tricked&#8221; into <a href="https://www.benzinga.com/news/24/07/39897986/elon-musk-vowed-to-destroy-woke-mind-virus-after-being-tricked-into-signing-puberty-blocker-document">consenting to puberty blockers</a> for his child.</p>\n\n\n\n<p>Notably, Wilson said that Musk had &#8220;not by any means&#8221; been tricked in to signing the forms and &#8220;He knew the full side effects,&#8221; according to NBC News. She said when she gave her father the forms he read them at least twice before signing them.</p>\n\n\n\n<p>On Puberty Blockers, she said, &#8220;They save lives. Let\'s not get that twisted," she said. "They definitely allowed me to thrive.&#8221;</p>\n\n\n\n<p><em>Image via Shutterstock</em></p>\n\n\n\n<p><strong>Read Next: </strong></p>\n\n\n\n<ul>\n<li><a href="https://www.benzinga.com/news/24/07/39900117/elon-musk-denies-45m-monthly-donation-to-trump-clarifies-true-purpose-of-the-america-pac-in-intervie?itm_source=parsely-api"><strong>Elon Musk Denies $45M Monthly Donation To Trump, Clarifies True Purpose Of &#8216;The America PAC&#8217; In Interview With Jordan Peterson</strong></a></li>\n</ul>\n\n\n\n<p><strong><em>Disclaimer:</em></strong><em> This content was partially produced with the help of AI tools and was reviewed and published by Benzinga editors.</em><a href="https://benzinga.com/apis" target="_blank" rel="noreferrer noopener"></a></p>',
                    symbols: ['TSLA'],
                    source: 'benzinga',
                });
                this.newsSubject.next(data);
            },
            (err) => console.log(err)
        );
    }

    public getUpdatedNews(): Observable<any> {
        return this.newsSubject.asObservable();
    }

    public disconnect(): void {
        if (this.wsSubject) {
            this.wsSubject.complete();
        }
    }
}
